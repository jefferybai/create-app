/**
 * 
 */
import { USER_SERVICE_BASEPATH } from '../constants/api_http'

/**
 * @param {string} callApiProxy 
 * @param {string} indexPath 检测到已登录时，跳转到该路径
 * @param {string} loginPath 检测到未登录时，跳转到该路径, 默认为'/login'
 */
export default function checkAuthBeforeEnterCore(callApiProxy, indexPath, loginPath) {
    var isFirst = true;
    loginPath = loginPath||'/login';
    return function (nextState, replace, cb) {
        if (!isFirst) {
            return cb();
        }
        let userToken = localStorage.getItem('usertoken');
        if(userToken) {
            replace({
                pathname: indexPath,
                state: { loginUser: result }
            })
        } else {
            replace(loginPath);
        }
        cb()
        isFirst = false;
    }
}