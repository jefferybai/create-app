"use strict";
/**
 * 异常处理中间件模块
 */
import '../../utils/console'
import { alert } from '../actions/app'
import { CALL_API_HTTP_FAIL } from '../constants/api_http'
import { QUERY, LOGOUT } from '../constants/login'
import { message } from 'antd';
import { showProgress, hideProgress } from '../actions/app'
import { push } from 'react-router-redux'

var defaultErrorCodeMap = {
    401: "登录失效，请重新登陆！",
    415: "用户名或密码不正确",
}

/**
 * 异常处理中间件生成函数，需要传入一个errorCodeMap
 * @param {object||function} [errorCodeMap] 普通js对象或函数. 需要通过系统弹出框显示提示的错误码以及提示信息. 
 *                      如果是函数，则函数需要返回errorCodeMap，该会每次执行，切会被注入两各参数，
 *                      err：服务端返回的错误json对象，store: redux的store
 * @return {function} redux middleware
 */
export default errorCodeMap => {
    if (typeof errorCodeMap == 'object') {
        errorCodeMap = Object.assign({}, defaultErrorCodeMap, errorCodeMap);
    }

    return store => next => action => {
        if (action.type !== CALL_API_HTTP_FAIL) {
            return next(action)
        }
        var isLoginPage = window.location.hash.split('?')[0] == '#/login'
        var error = action.error

        if (!(error instanceof Error)) {
            switch(error.status) {
                case 1003:
                    if (isLoginPage) { 
                        return next({type: LOGOUT}) 
                    } else {
                        push('login');
                    }
                default:
                    message.error(error.error, 5);
                    break;
            }
            next(hideProgress())
            console.error(error)
            return next(action)
        } else {
            message.error(action.error.message, 5);
            console.error(action)
            next(action)
            throw error;
        }
    }
}