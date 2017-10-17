export function takeCanvasPhoto() {
    let canvas = document.getElementsByClassName('lower-canvas')[0];
    // var w=window.open('about:blank','image from canvas');  
    // w.document.write("<img src='"+canvas.toDataURL("image/png")+"' alt='from canvas'/>");  
	return canvas.toDataURL("image/png");
}

export function downloadFile(fileName, content){
    var aLink = document.createElement('a');
    var blob = base64Img2Blob(content);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
}  

export function base64Img2Blob(code){
    var parts = code.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType}); 
}