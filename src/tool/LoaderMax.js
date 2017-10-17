export function loadImgAssets(imgs, callBack, opt = {}) {
    let result = {};
    let j = 0;
    imgs.forEach((item, i) => {
        fabric.Image.fromURL(item.url, function(data, oimg) {
            result[data.name] = oimg;
            j ++;
            j == imgs.length && callBack(result);
        }.bind(this, item), opt)
    });
}