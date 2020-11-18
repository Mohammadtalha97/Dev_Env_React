import { combineReducers } from "redux";

import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  apiCallsInProgress: apiCallStatusReducer,
});

export default rootReducer;
