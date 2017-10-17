/**
 * Created by sundelong on 17/6/13.
 */
export function log(msg,pre){
    if (!document.getElementById("sdk_log")) {
        var logContainer = document.createElement("div");
        logContainer.style.position =  'absolute';
        logContainer.style.left = logContainer.style.top = '10px';
        logContainer.id = "sdk_log";
        document.body.appendChild(logContainer);
    }
    var pi = document.createElement("p");
    var text = typeof(msg);
    if(pre != undefined){
        text += "|"+pre+"|";
    }
    if(typeof(msg)  == "string"){
        pi.innerHTML = text+msg;
    }else{
        pi.innerHTML = text+JSON.stringify(msg);

    }
    var logContainer = document.getElementById("sdk_log");
    logContainer.insertBefore(pi, logContainer.firstChild);
}


// window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
//     log("错误信息：" , errorMessage);
//     log("出错文件：" , scriptURI);
//     log("出错行号：" , lineNumber);
//     log("出错列号：" , columnNumber);
//     log("错误详情：" , errorObj);

// }