import {combineReducers} from "redux";
import app from './app';
import pings from "./pings";


const PingChecker = combineReducers({
    app: app,
    pings: pings,
});

export default PingChecker
