

export default class UploadFile{
		
		static now = Date.parse(new Date()) / 1000;

		static NameByImage(filename){//拼接加密后文件名
			return 'image/'+this.getNowFormatDate()+"/"+this.now+this.random_string(6)+this.get_suffix(filename);
		}

		static NameByImageDataurl(su){//拼接加密后文件名
			return 'image/'+this.getNowFormatDate()+"/"+this.now+this.random_string(6)+this.suffix_match_by_image(su);
		}

		static NameByFile(filename){//拼接加密后文件名
			return 'file/'+this.getNowFormatDate()+"/"+this.now+this.random_string(6)+this.get_suffix(filename);
		}
			
		static get_suffix(filename) { //获取后缀
			var pos = filename.lastIndexOf('.')
			var suffix = ''
			if (pos != -1) {
				suffix = filename.substring(pos)
			}
			return suffix;
		}


		static getNowFormatDate() {//获取当前年月日
				var date = new Date();
				var seperator1 = "";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
		}
			
		
			
		static random_string(len) {//拼接随机文件名
			　　len = len || 32;
			　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
			　　var maxPos = chars.length;
			　　var pwd = '';
			　　for (let i = 0; i < len; i++) {
			    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
			    }
			    return this.now+pwd;
		}
		
		static get(url,callback){//get获取方式
			    var xhr = new XMLHttpRequest();
			    xhr.onreadystatechange = function (){
			      if (xhr.readyState == 4) {
			            if ((xhr.status > 199 && xhr.status < 300) || xhr.status == 304) {
			              callback(xhr.responseText);
			          }else {
			              alert("request failed : " + xhr.status);
			          }
			      };
			  }
			  xhr.open('get',url,true);
			  xhr.send(null);//get 不将数据作为参数传入
		 }
		 
		 static getFileType(type,fname){//获取上传的文件类型
			 switch(type){
				case 'image':
					return this.NameByImage(fname);
				case 'file' :
					return this.NameByFile(fname);
				default:
					return false;
			 }
		 }

		 static suffix_match_by_image(suffix){//image文件类型匹配
			 switch(suffix){
				 case 'image/gif':
				 	return 'gif';
				 case 'image/jpeg':
				 	return 'jpg';
				 case 'image/bmp':
				 	return 'bmp';
				 case 'image/png':
				 	return 'png';	 
				 default:
				 	return false;	 
			 }
		 }

		 static suffix_match_by_file(suffix){//file文件类型匹配
			 switch(suffix){
				 case 'video/mp4':
				 	return 'mp4';
				 case 'application/zip':
				 	return 'zip';
				 case 'audio/mp3':
				 	return 'mp3';
				 case 'audio/mpeg':
                     return 'mp3';
				 default:
				 	return false;	 
			 }
		 }

		 static in_array(search,array){
				for(var i in array){
					if(array[i]==search){
						return true;
					}
				}
				return false;
		 }

		     static dataURLtoBlob(dataurl) {
				var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new Blob([u8arr], { type: mime });
			 }

		static upload = function(option){
		 	      option.online = option.online ? 'socket.firstleap.cn':'192.168.6.108:8123';


			 	var filters = option.filters || false,
				 	success = option.success,
					progress = option.progress,
					error = option.error,
					before = option.before||false,
					file = option.file,
					filename = null,
                              signUrl = "https://"+option.online+"/webapi/v4/sign/get?oss_id="+option.signUrl||1

					if(typeof file == 'string'){
						file = this.dataURLtoBlob(file);
						if(!this.suffix_match_by_image(file.type)){
							error("dataurl只支持图片上传");
							return false;
						}
						file.name = this.now+"."+this.suffix_match_by_image(file.type);
					}
							
					if(typeof file == 'object'){
						
						if(Math.round(file.size/1024) > parseInt(filters.max_file_size)){
							error("文件过大");
							return false;
						}
					}
					if(this.suffix_match_by_image(file.type)){
						if(!this.in_array(this.suffix_match_by_image(file.type),filters.suffix)){
							error("过滤数组中没有此后缀");
							return false;
						}
						filename = this.getFileType('image',file.name);
					}else if(this.suffix_match_by_file(file.type)){
						if(!this.in_array(this.suffix_match_by_file(file.type),filters.suffix)){
							error("过滤数组中没有此后缀");
							return false;
						}
						filename = this.getFileType('file',file.name);
					}else{
						error("不支持此类型文件");
						return false;
					}
				if(before){
					before("做一些事情");
				}
				this.get(signUrl,function(res){
				 	var sign = JSON.parse(res);
				          sign = sign.data;
				    var fd = new FormData();
				    var xhr = new XMLHttpRequest();    
			        	fd.append("key",filename);
						fd.append("policy", sign.policy);
			 			fd.append("OSSAccessKeyId", sign.accessid);
			  			fd.append("success_action_status", '200');//让服务端返回200,不然，默认会返回204
						fd.append("signature", sign.signature);
				 		fd.append("file",file);
				 		xhr.onreadystatechange = function() {
			                if (xhr.readyState == 4 && xhr.status == 200) {
							if(success instanceof Function){
								sign.cdn = sign.cdn.replace(/http:\/\//, "https://");
								success(sign.cdn+filename);
							}
			                }
			            }
			            //侦查当前附件上传情况
			            xhr.upload.onprogress = function(evt) {
				            var loaded = evt.loaded;
				            var tot = evt.total;
				            var per = Math.floor(100 * loaded / tot); //已经上传的百分比
			                	if(progress instanceof Function){
				                  	progress(per);
				             	}
			            };
						xhr.open("post",sign.host.replace(/http:\/\//, "https://"));
						xhr.send(fd);
				 })	
		}
}