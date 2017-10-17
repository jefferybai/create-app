/**
 * Created by ken on 2017/5/25.
 */
const isArray = arr => arr instanceof Array;
const isObject = obj => (typeof obj === 'object') && !isArray(obj);
/**
 * 深度拷贝
 * @param target 要考入数据的目标 根据被拷贝数据类型决定
 * @param param  被拷贝数据
 * @returns {*}
 */
const superExtends = (target, param) => {
    if (isObject(param)) {
        for (let key in param) {
            if (param.hasOwnProperty(key)) {
                if (isObject(param[key])) {
                    target[key] = superExtends({}, param[key])
                } else if (isArray(param[key])) {
                    target[key] = superExtends([], param[key])
                } else {
                    target[key] = param[key]
                }
            }
        }
    } else if (isArray(param)) {
        for (let i = 0; i < param.length; i++) {
            if (isArray(param[i])) {
                target[i] = superExtends([],param[i])
            } else if (isObject(param[i])) {
                target[i] = superExtends({},param[i])
            } else {
                target[i] = param[i];
            }
        }
    } else {
        target = param;
    }
    return target;
};
export default superExtends