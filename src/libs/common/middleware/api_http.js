"use strict";
/**
 * 调用符合公司规范的*.paratera.com的api调用的处理的中间件
 */
import callApi from '../../utils/call_api'
import { CALL_API_HTTP, CALL_API_HTTP_START, CALL_API_HTTP_FAIL, CALL_API_HTTP_DONE} from '../constants/api_http'
import { showProgress, hideProgress } from '../actions/app'
import {hashHistory} from 'react-router';

// A Redux middleware that interprets actions with CALL_API_HTTP info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    if (action.type !== CALL_API_HTTP) {
        return next(action)
    }

    let {
        apiActionType,
        basepath = '/',
        endpoint,
        method = 'GET',
        data,
        contentType = "json",
        acceptType = "json"
    } = action

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!['object', 'undefined', 'string'].includes(typeof data)) {
        throw new Error('Expected data to be object')
    }

    next(Object.assign(action, { type: CALL_API_HTTP_START }))
    var option = {
        url: basepath + "/" + endpoint,
        method,
        contentType,
        acceptType: 'text',
        data
    };
    //是否是服务端未捕获的错误
    return callApi(option)
        .catch(e => {
            next({
                type: CALL_API_HTTP_FAIL,
                apiActionType: apiActionType,
                error: e
            })
            return Promise.reject(e);
        })
        .then(response => {
            next({
                    response,
                    type: apiActionType
                })
            next({type: CALL_API_HTTP_DONE})
            return response;
        })
}