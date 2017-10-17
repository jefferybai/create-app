import asyncActionCreator from '../libs/utils/asyncActionCreator'
import { CALL_API_HTTP_START, CALL_API_HTTP_DONE, CALL_API_HTTP, DOWNLOAD } from '../libs/common/constants/api_http'
import * as ActionTypes from '../constants/app'

//存储班级列表
export const saveClassList = function(data) {
    return {
        type: ActionTypes.APP_GET_DATA,
        data
    }
}

