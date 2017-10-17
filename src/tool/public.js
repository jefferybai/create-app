export function filterObject(availableObj, object) {
    let newObj = {}
    for(let attr in availableObj) {
        newObj[attr] = object[attr];
    }
    return newObj;
}

let normalAtrr = {locked: true,
            selectable: false,
            evented: false,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            lockUniScaling: true,
            hasControls: false,
            hasBorders: true,
        }

export function toPlayData(data) {
    let resultList = [];
    data.map((page, i) => {
        let answerNum = 0;
        page.objects.map((item, i) => {
            let result = Object.assign(item, normalAtrr);
            result.activeble && (result = Object.assign(result, {evented: true, selectable: true, hasBorders: false}));
            if(result.hasOwnProperty('answer')) {
                if(page.interactionType == 'choice' && result.answer == true) {
                    answerNum ++;
                }
            }
            if(page.interactionType == 'match') {
                result = Object.assign(item, {lockMovementX: false,lockMovementY: false});
            }
            if(page.interactionType == 'superSort') {
                if(result.zoneName) {
                    result = Object.assign(item, {evented: false, selectable: false});
                } else {
                    result = Object.assign(item, {lockMovementX: false,lockMovementY: false});
                }
            }
            return result;
        })
        return answerNum < 2 ? page : Object.assign(page, {interactionType: 'multiChoice'});
    })
    return data;
}

export function getExplore(){
    var Sys = {};  
    var ua = navigator.userAgent.toLowerCase();  
    var s;  
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :  
    (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
    (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :  
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :  
    (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :  
    (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;  
    // 根据关系进行判断
    if (Sys.ie) return ('IE: ' + Sys.ie);  
    if (Sys.edge) return ('EDGE: ' + Sys.edge);
    if (Sys.firefox) return ('Firefox: ' + Sys.firefox);  
    if (Sys.chrome) return ('Chrome: ' + Sys.chrome);  
    if (Sys.opera) return ('Opera: ' + Sys.opera);  
    if (Sys.safari) return ('Safari: ' + Sys.safari);
    return 'Unkonwn';
}

//js判断是否移动端
export function isMobile(){
    return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isPhone(){
    return /Android|iPhone|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

//url to base64 xmlrequest 
export function getBase64FormUrl(obj, i) {
    var myRequest = new Request(obj.iconImg);
    return new Promise((resolve, reject) => {
        fetch(myRequest).
        then((response) => response.blob()).
        then((myBlob) => {
            let reader = new FileReader();
            reader.readAsDataURL(myBlob);
            reader.onload = function() {
                resolve(Object.assign(obj, {iconImg: this.result, sort: i}));
            }
        })

    });
}

const questionTypeRefrence = {
    poll: 'survey',
    choice: 'choice',
    read: 'read'
}

//生成ibl数据
export function adapterIbl(data) {
    return data.map((item, i) => {
        let readObj = item.interactionType == 'read' ? item.objects.filter((obj) => obj.utype == 'readItOut')[0] : null;
        return {
            type: item.interactionType == undefined ? 'display' : item.interactionType,
            page: i,
            content_type: readObj ? readObj.contentType : '',
            content: readObj ? readObj.answer : ''
        }
    })
}