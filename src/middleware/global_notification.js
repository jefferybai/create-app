import { APP_ALERT_MSG } from '../libs/common/constants/app'
import {notification} from 'antd';

export default store => next => action => {
    switch (action.type) {
        case APP_ALERT_MSG:
            notification[action.alertType ? action.alertType  : 'info']({
                    message: 'Notification',
                    description: action.msg 
                }
            )
            break;
    }
    return next(action)
}