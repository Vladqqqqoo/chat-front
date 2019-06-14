import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import chatReducer from './reducers/chatReducer'

export default createStore(combineReducers({chatReducer}), {}, applyMiddleware(logger, thunk));
