import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import tagsReducer from './tagsReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  tag: tagsReducer,
  // login: loginUserReducer,
});
