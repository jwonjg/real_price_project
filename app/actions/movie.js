export function openMovieDetailPopup(movieInfo) {
  return {
    type: 'OPEN_MOVIE_DETAIL_POPUP',
    movieInfo: movieInfo
  }
}

export function closeMovieDetailPopup() {
  return {
    type: 'CLOSE_MOVIE_DETAIL_POPUP',
    movieInfo: {}
  }
}

export function findMovieList(query, fields, options) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/readMovieList', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: query,
        fields: fields,
        options: options
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'FIND_MOVIE_SUCCESS',
            movieList: json.movieList
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'FIND_MOVIE_FAILURE',
            movieList: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
