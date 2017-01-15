import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import { movieInfo, moviePopup } from './movie';

export default combineReducers({
  messages,
  auth,
  movieInfo,
  moviePopup
});
