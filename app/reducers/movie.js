import { combineReducers } from 'redux';

const initialInfoState = {
  movieList: []
};

export function movieInfo(state = initialInfoState, action) {
  // if (!state.hydrated) {
  //   state = Object.assign({}, initialState, state, { hydrated: true });
  // }
  switch (action.type) {
    case 'FIND_MOVIE_SUCCESS':
      return Object.assign({}, state, {
        movieList: action.movieList
      });
    case 'FIND_MOVIE_FAILURE':
      return initialInfoState;
    default:
      return state;
  }
}

const initialPopupState = {
  isOpenPopup: false,
  movieInfo: {}
};

export function moviePopup(state = initialPopupState, action) {
  switch (action.type) {
    case 'OPEN_MOVIE_DETAIL_POPUP':
      return Object.assign({}, state, {
        isOpenPopup: true,
        movieInfo: action.movieInfo
      });
    case 'CLOSE_MOVIE_DETAIL_POPUP':
      return Object.assign({}, state, {
        isOpenPopup: false,
        movieInfo: action.movieInfo
      });
    default:
      return state;
  }
}
