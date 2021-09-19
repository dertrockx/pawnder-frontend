import { combineReducers } from "redux";

import auth from "redux/reducers/authReducer"

const rootReducer = combineReducers({
    auth,
});

export default rootReducer;