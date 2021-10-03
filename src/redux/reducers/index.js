import { combineReducers } from "redux";
import auth from "./authReducer";
import pet from "./petReducer";
import applicant from "./applicantReducer";
const rootReducer = combineReducers({ auth, pet, applicant });

export default rootReducer;
