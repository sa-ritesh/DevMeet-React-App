import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";
import logger from "redux-logger";
const store = createStore(combineReducers, applyMiddleware(thunk, logger));

export default store;
