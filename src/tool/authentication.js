import {hashHistory} from 'react-router';
import httpApiProxy from '../libs/utils/call_api'
import { BASE_PATH } from '../constants/api_http'
import {getExplore} from './public'

export const authenInputUrl = ()=> {
    (!localStorage.getItem('usertoken') ||
    !localStorage.getItem('CURRENT_TEACHER_ROLES_ID') ) &&
    setTimeout(() => {hashHistory.push('login')}, 100)
};

export default () => {
    let firstEnter = true;
    return (nextState, replace) => {
        if(firstEnter == false) {return};
        firstEnter = false;
        if(nextState.location.pathname.indexOf('player') !== -1) {return};

        let exploreName = getExplore();
        if(exploreName.indexOf('Safari') != -1 || exploreName.indexOf('Chrome') != -1) {
            exploreName = exploreName.replace(" ", "");
            let exploreArray = exploreName.split(':');
            if(exploreArray[0] == 'Safari') {
                if(parseFloat(exploreArray[1]) < 10.1) {
                    hashHistory.push('propose')
                    return;
                }
            }
            if(exploreArray[0] == 'Chrome') {
                if(parseFloat(exploreArray[1]) < 49) {
                    hashHistory.push('propose')
                    return;
                }
            }
        } else {
            hashHistory.push('propose')
            return;
        }

        httpApiProxy(
            {
                url: BASE_PATH + '/mobileapi/v4/teacher/classlist',
                method: 'GET',
                acceptType: 'text',
                data: {role_id: 6}
            }
        ).then((res) => {
            if(!(localStorage.getItem('CURRENT_TEACHER_ROLES_ID'))) {
                hashHistory.push('login');
            }
            else if(nextState.location.pathname == '/') {
                hashHistory.push('fcs');
            }
        }).catch(
            (res) => {
                if(res.status == 1014) {//1014 为超时
                    return
                }
                hashHistory.push('login');
            }
        )
    }
}
