import httpApi from '../libs/common/middleware/api_http'
import exception_handler from '../libs/common/middleware/exception_handler'
import global_progress from '../libs/common/middleware/global_progress'
import global_notification from './global_notification'

import errCodeMap from '../constants/error_code_map'

export default [
    httpApi,
    exception_handler(errCodeMap),
    global_progress,
    global_notification
]