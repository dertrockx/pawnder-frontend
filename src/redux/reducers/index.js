import { combineReducers } from "redux";
import auth from "./authReducer";
import pet from "./petReducer";
const rootReducer = combineReducers({ auth, pet });

export default rootReducer;
