var request = require('request');
var Price = require('../model/schemas/Price');

const defaultRealPrice = 10000;

/**
 * POST /insertPricePost
 */
exports.insertPricePost = function(req, res) {
  new Promise((resolve, reject) => {
    createPrice(req.body.priceInfo)
      .save(function(err) {
        if(!err) {
          resolve(req.body.priceInfo);
        } else {
          reject();
        }
      });
  }).then((priceInfo) => {
    Price
      .find({movieCd:priceInfo.movieCd, email:movieCd.email})
      .populate("realPrice")
      .exec((err, realPriceList) => {
        if(err) {
          console.log(err);
        } else {
          let cnt = realPriceList.length;
          let sum = realPriceList.reduce((a, b) => a + b, 0);
          console.log("average");
          console.log(sum/cnt);
          priceInfo.realPriceList = sum/cnt;
          res.send(priceInfo);
        }
      });
  });
}

function createPrice(priceInfo) {
  console.log("createPrice");
  console.log(priceInfo);
  return new Price({
    movieCd: priceInfo.movieCd,
    email: priceInfo.email,
    realPrice: priceInfo.realPrice
  });
}
