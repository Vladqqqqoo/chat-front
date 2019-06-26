import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import user from './reducers/authReducer';
import chat from './reducers/chatReducer';


export default createStore(combineReducers({user, chat}), {}, applyMiddleware(logger, thunk, promise));
