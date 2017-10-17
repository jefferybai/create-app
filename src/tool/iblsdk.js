/*!
 * wcr-interactive-doc-sdk v1.0
 * 
 * Copyright 2016 by WeClassRoom 
 * Released under GPL V2 License
 * 
 * xiongzefa@100tal.com 201607
 *
 */


    function WCRInteractiveDocSDK(global) {

        var that = this;

        // SDK使用方响应老师发送的消息
        var outer_msg_callback_;


        // 需要优先调用setup进行初始化
        var config_inited_ = false;
        var config_ = {};

        var SDKTYPE = {
            ST_UNKNOWN: 0,
            ST_MESSAGEHANDLE: 1,
            ST_DIRECTCALL: 2
        };

        var sdk_type_ = SDKTYPE.ST_UNKNOWN;
        var doc_id_ = "";

        var init_completed_ = false;

        this.log = function(msg) {
            if (!document.getElementById("wcr_log")) {
                var logContainer = document.createElement("div");
                logContainer.id = "wcr_log";
                document.body.appendChild(logContainer);
            }
            var pi = document.createElement("p");
            pi.innerHTML = msg;
            var logContainer = document.getElementById("wcr_log");
            logContainer.insertBefore(pi, logContainer.firstChild);
        }

        // 初始化SDK, 完成之后会调用setup_complete
        this.setup = function(config, setup_complete) {
            this.detactSDKType();
            if (this.sdk_type_ == SDKTYPE.ST_UNKNOWN) {
                setup_complete(-1, "unknown client");
                return;
            }


            if (this.sdk_type_ == SDKTYPE.ST_DIRECTCALL) {
                // user setting
                var user = JSON.parse(window.WCRDocJSSDK.getUser());
                if (user["isTeacher"] == true) { // teacher
                    config_["isTeacher"] = true;
                } else {
                    config_["isTeacher"] = false;
                }
                config_["classId"] = user["classId"];
                config_["userId"] = user["userId"];
                config_["token"] = user["token"];
                // set callback
                window.WCRDocJSSDK.setMsgCallback(this.persistentCallback(this.onMessageReceived));
                outer_msg_callback_ = config["msg_callback"];

                that.doc_id_ = window.WCRDocJSSDK.getDocId();

                init_completed_ = true;
                var completeInfo = {
                    'classId': user["classId"],
                    'userId': user["userId"],
                    'token': user["token"]

                }
                setup_complete(0, completeInfo);
            } else if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {

                var messagebody = {
                    "msg_callback": this.persistentCallback(this.onMessageReceived)
                };
                var message = { 
                    'message' : 'setup',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        var error = content["error"];

                        if (error) {
                            setup_complete(error, content["description"]);
                            return;
                        }
                        config_["isTeacher"] = content["isTeacher"];
                        config_["classId"] = content["classId"];
                        config_["userId"] = content["userId"]; 
                        config_["token"] = content["token"];
                        that.doc_id_ = content["docId"];

                        init_completed_ = true;
                        var completeInfo = {
                            'classId': content["classId"],
                            'userId': content["userId"],
                            'token': content["token"],
                        };
                        setup_complete(0, completeInfo);
                    }) 
                };
                outer_msg_callback_ = config["msg_callback"];
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            }
        };

        this.courseReady = function(isReady) {
            that.log("courseReady");
            console.log('sdk.courseReady:',isReady)
            if (window.WCRDocJSSDK && window.WCRDocJSSDK.icourseReady) {
                window.WCRDocJSSDK.icourseReady(isReady);
            }
        }

        this.oneshotCallback = function(callback) {
            var randomFunctionName = "ONESHOT_" + (new Date()).getTime() + "_";
            global[randomFunctionName] = function(content) {
                callback(content);
                delete global[randomFunctionName];
            }
            return randomFunctionName;
        }

        this.persistentCallback = function(callback) {
            var randomFunctionName = "PERSISTENT_" + (new Date()).getTime() + "_";
            global[randomFunctionName] = function(content) {
                callback(content);
            }
            return randomFunctionName;
        }

        this.detactSDKType = function() {
            if (window.webkit != undefined
                && window.webkit.messageHandlers != undefined 
                && window.webkit.messageHandlers.WCRDocJSSDK != undefined) {
                this.sdk_type_ = SDKTYPE.ST_MESSAGEHANDLE;
            } else if (window.WCRDocJSSDK) {
                this.sdk_type_ = SDKTYPE.ST_DIRECTCALL;
            } else {
                this.sdk_type_ = SDKTYPE.ST_UNKNOWN;
            }
        };

        // 获取当前文档的DOC ID
        this.getDocId = function() {
            return this.doc_id_;
        };

        // 获取当前文档所在的用户角色
        this.isTeacher = function() {
            return config_["isTeacher"];
        };

        // 获取当前用户的id
        this.getUserId = function() {
            return config_["userId"];
        }

        // 获取当前课堂的id
        this.getClassId = function() {
            return config_["classId"];
        }

        // 老师向学生发送开始答题消息
        // @docId: string 当前文档的唯一ID
        // @tid: int 测试题的唯一ID
        // @starttime: 答题开始时间
        // @timeout: 从开始事件到题目过期的间隔(s) 
        this.sendStartTesting = function(docid, tid, starttime, timeout) {
            if (!this.isTeacher()) {
                that.log("! student permission denied");
                return false;
            }
            var msg = "start.test";
            var msgBody = {
                "docid": docid,
                "tid": tid,
                "starttime": starttime,
                "timeout": timeout,
            };
            this.sendMessage(msg, msgBody);
        };

        // 老师向学生发送结束答题消息
        // @docId: string 当前文档的唯一ID
        // @tid: int 测试题的唯一ID
        this.sendStopTesting = function(docid, tid) {
            if (!this.isTeacher()) {
                that.log("! student permission denied");
                return false;
            }
            var msg = "stop.test";
            var msgBody = {
                "docid": docid,
                "tid": tid,
            };
            this.sendMessage(msg, msgBody);
        };

        // 向老师发送答题结果
        // @docId: string 当前文档的唯一ID
        // @tid: int 测试题的唯一ID
        // @score: int 当前的综合评分
        // @maxscore: int score的最大值
        // @animation: int 得分动画(0 没有动画, 1 WonderFul动画, 2 得分动画, 3 超时动画)
        this.sendTestingScore = function(docid, tid, score, maxscore, animation) {
            if (this.isTeacher()) {
                that.log("! teacher permission denied");
                return false;
            }
            if (!animation)
                animation = 0;
            var msg = "report.test.score";
            var msgBody = {
                "docid": docid,
                "tid": tid,
                "score": score,
                "maxscore": maxscore,
                "animation": animation
            };
            this.sendMessage(msg, msgBody);
        };

        this.sendMessage = function(msg, msgBody) {
            if (!init_completed_) {
                return;
            }

            that.log("Message->: " + msg);
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {
                    "msg": msg,
                    "body": msgBody
                };
                var message = { 
                    'message' : 'sendMessage',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        // send complete
                    }) 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.sendMessage(msg, JSON.stringify(msgBody));
            }
        };

        // native   support
        // string   type "read_syllable" "read_word" "read_sentence"
        // string   language "en_us" "zh_cn"
        // jsonObj  data 
        //             "read_word" : {"words": ['1', '2' ...]}
        //             "sentence"  : {"sentence": "xxxxxx"}
        // int      timeout (s)
        // callback function(content){} 
        //          content = { "notify": "xxx",  "body": {}}
        this.startSpeechEvaluation = function(type, language, data, timeout, callback,tid) {
            if (!init_completed_) {
                that.log("! startSpeechEvaluation failed - init not complete");
                return;
            }

            if (!callback) {
                that.log("! startSpeechEvaluation failed - callback is null");
                return;
            }

            if (language != "zh_cn" && language != "en_us") {
                that.log("! startSpeechEvaluation failed - language is invalid");
                return;
            }

            var messagebody = {
                "timeout": timeout,
                "type": type,
                "language": language,
                "data": data,
                "tid":tid
            };
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var message = { 
                    'message' : 'startSpeechEvaluation',
                    'body' : messagebody,
                    'callback' : this.persistentCallback(function(content) {
                        callback(content);
                    }) 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.startSpeechEvaluation(JSON.stringify(messagebody)
                    , this.persistentCallback(function(content) {
                        callback(content);
                    }));
            }
        };

        // 检测是否当前正在进行跟读
        // callback function(content){} 
        //          content = { "result": true|false}
        this.duringSpeechEvaluation = function(callback) {
            var messagebody = {};
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var message = { 
                    'message' : 'duringSpeechEvaluation',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        callback(content);
                    }) 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.duringSpeechEvaluation(JSON.stringify(messagebody)
                    , this.oneshotCallback(function(content) {
                        callback(content);
                    }));
            }
        };
        
        // stop on going speech evaluation
        this.stopSpeechEvaluation = function() {
            that.log("stopSpeechEvaluation");
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {};
                var message = { 
                    'message' : 'stopSpeechEvaluation',
                    'body' : messagebody 
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.stopSpeechEvaluation();
            }
        };

        // 获取最终的成绩结果
        this.getFinalScore = function(callback) {
            that.log("getFinalScore");
            if (this.sdk_type_ == SDKTYPE.ST_MESSAGEHANDLE) {
                var messagebody = {};
                var message = { 
                    'message' : 'getFinalScore',
                    'body' : messagebody,
                    'callback' : this.oneshotCallback(function(content) {
                        callback(content);
                    })  
                };
                window.webkit.messageHandlers.WCRDocJSSDK.postMessage(JSON.stringify(message));
            } else {
                window.WCRDocJSSDK.getFinalScore(this.oneshotCallback(function(content) {
                        callback(content);
                    }));
            }
        };

        this.onMessageReceived = function(content) {
            that.log("Message<-: " + content["msg"]);
            if (outer_msg_callback_) {
                outer_msg_callback_(content);
            }
        };
    }
    
    export function createIblSdk () {
        var g_wcrDocSDK = new WCRInteractiveDocSDK(window);

        window.WCRDocSDK = g_wcrDocSDK;

        window.WCRInteractiveDocSDK = WCRInteractiveDocSDK;
    }
    

