import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./reducers";
import logger from "redux-logger";
const middleware = [thunk, logger];
const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
