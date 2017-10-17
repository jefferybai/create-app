/**
 * 系统状态模型，以及数据存储
 * @module reducers/app
 */
import * as AppActionType from '../constants/app';

export function currentClassList(state={}, action) {
    switch (action.type){
        case AppActionType.APP_GET_DATA:
            state = action.response.data;
            return state;
        default:
            return state;
    }
}
