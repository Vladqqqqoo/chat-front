import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import user from './reducers/authReducer';


export default createStore(combineReducers({user}), {}, applyMiddleware(logger, thunk, promise));
