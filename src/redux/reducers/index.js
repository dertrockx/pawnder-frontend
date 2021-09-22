import { combineReducers } from "redux";

import auth from './authReducer';
import story from './storyReducer';

const rootReducer = combineReducers({
  auth,
  story
});

export default rootReducer;