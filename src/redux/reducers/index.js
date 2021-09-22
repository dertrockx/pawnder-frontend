import { combineReducers } from "redux";
import auth from "./authReducer";
import pet from "./petReducer";
import applicant from "./applicantReducer";
import story from "./storyReducer";
const rootReducer = combineReducers({ auth, pet, applicant, story });

export default rootReducer;
