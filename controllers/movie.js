var request = require('request');
var Movie = require('../model/schemas/Movie');
var Code = require('../model/schemas/Code');
var Constant = require('../app/common/Constant');

const defaultRealPrice = 10000;

/**
 * POST /readMovieListPost
 */
exports.readMovieListPost = function(req, res) {
  Movie
    .find(req.body.query, req.body.fields, req.body.options)
    .populate("openStateCdInfo")
    .exec((err, movieList) => {
      if(err) {
        console.log(err);
      } else {
        res.send(movieList);
      }
    });
  // Movie.find(req.body.query, req.body.fields, req.body.options, function(error, docs) {
  //   res.send(docs);
  // });
}

/**
 * GET /resetIsOpenGet
 */
exports.resetIsOpenGet = function(req, res, next) {
  new Promise((resolve, reject) => {
    Movie.find(
      {openStateCd:{$ne:Constant.codeInfo.openState.codeIdList.closed}},
      function(err, movieList) {
        if(!err) {
          Promise.all(movieList.map((movieInfo) => {
            return new Promise((resolve, reject) => {
              Movie.update(
                {movieCd:movieInfo.movieCd},
                {$set:{openStateCd:getBoxOfficeOpenState(movieInfo.openDt)}},
                function(err, numberAffected) {
                  if(!err) {
                    resolve();
                  } else {
                    reject();
                  }
                }
              );
            });
          })).then(() => {
            resolve();
          })
        } else {
          reject(err);
        }
      }
    );
  }).then(() => {
    next();
  });
}

/**
 * GET /retrieveBoxoffice
 */
exports.retrieveNewBoxOfficeDetailGet = function(req, res, next) {
  let targetDt = req.params.targetDt;

  requireBoxOfficeListInfo(targetDt)
    .then(movies => {
      movies.forEach(saveNewMovieDetailInfo);
    });
  next();
}

function requireBoxOfficeListInfo(targetDt) {
  return new Promise(function(resolve, reject) {
    let kobisApiKey = process.env.KOBIS_API_KEY;
    request(encodeURI('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key='+kobisApiKey+'&targetDt='+targetDt),
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body).boxOfficeResult.dailyBoxOfficeList);
        } else {
          reject(error);
        }
      }
    );
  });
}

function saveNewMovieDetailInfo(boxOfficeMovie) {
  extractNewBoxOfficeMovie(boxOfficeMovie)
    .then(isNotSaved => {
      if(isNotSaved) {
        retrieveMovieDetail(boxOfficeMovie)
          .then(movieDetailInfo => {
            saveMovieInfo(movieDetailInfo);
          })
      } else {
        updateOpenState(boxOfficeMovie);
      }
    });
}

function extractNewBoxOfficeMovie(boxOfficeMovie) {
  return new Promise(function(resolve, reject) {
    Movie.findOne({ movieCd: boxOfficeMovie.movieCd }, 'movieCd', function(error, movieCd) {
      if(!error) {
        resolve(Object.is(movieCd, null));
      } else {
        reject(error);
      }
    });
  });
}

function retrieveMovieDetail(newMovie) {
  return new Promise(function(resolve, reject) {
    let daumApiKey = process.env.DAUM_API_KEY;
    request(encodeURI('https://apis.daum.net/contents/movie?apikey='+daumApiKey+'&q=\''+newMovie.movieNm+'\'&output=json'),
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let movieDetail = JSON.parse(body).channel.item;
          movieDetail
            .filter((item) => item.open_info[0].content.replace(/\.|\-/g, '') == newMovie.openDt.replace(/\-|\./g, ''));
          Object.assign(newMovie, movieDetail[0]);
          resolve(newMovie);
        } else {
          reject(error);
        }
      }
    );
  });
}

function saveMovieInfo(movieInfo) {
  createMovie(movieInfo)
    .save(function(err) {
      console.log("saved!");
    });
}

function createMovie(movieInfo) {
  return new Movie({
    movieCd: movieInfo.movieCd,
    movieNm: movieInfo.movieNm,
    engMovieNm: movieInfo.eng_title[0].content,
    openDt: Date.parse(movieInfo.openDt),
    openStateCd: getBoxOfficeOpenState(movieInfo.openDt),
    rating: movieInfo.open_info[1].content,
    runtime: movieInfo.open_info[2].content,
    thumbnail: movieInfo.thumbnail[0].content,
    story: movieInfo.story[0].content,
    nation: movieInfo.nation[0].content,
    category: movieInfo.category[0].content,
    photoViewerUrl: movieInfo.photo_info[0].link,
    reserveUrl: movieInfo.res[0].link,
    genre: movieInfo.genre.map((item) => { return item.content; }),
    photoUrl: [movieInfo.photo1.content, movieInfo.photo2.content, movieInfo.photo3.content, movieInfo.photo4.content, movieInfo.photo5.content],
    director: movieInfo.director[0],
    actor: movieInfo.actor,
    video: movieInfo.video,
    realPrice: defaultRealPrice
  });
}

function updateOpenState(movieInfo) {
  Movie.update(
    {movieCd:movieInfo.movieCd},
    {$set:{openStateCd:getBoxOfficeOpenState(movieInfo.openDt)}},
    {multi:true},
    function(error, numAffected) {
      if(error) {
        console.log(error);
      }
    }
  );
}

function getBoxOfficeOpenState(openDtString) {
  if(Date.now() < Date.parse(openDtString)) {
    return Constant.codeInfo.openState.codeIdList.scheduled;
  } else {
    return Constant.codeInfo.openState.codeIdList.opening;
  }
}
