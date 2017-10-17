import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import * as App from './app'

const appReducer = combineReducers(Object.assign({
    routing: routerReducer,
}, App));
export default appReducer