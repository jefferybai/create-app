import React, { Component } from 'react'
import classnames from 'classnames'

export function getResultElByName(type, kclass, zoom, result, i, targetId) {
    let halfItemWidth = kclass.width * zoom * kclass.scaleX  / 2;
    let halfItemHeight = kclass.height * zoom * kclass.scaleY / 2;
    return <img className="flag-answer" src={ result.answer ? 
    require('../images/tv_btn_right.png') : kclass.id == targetId ? 
    require('../images/tv_btn_wrong.png') : require('../images/tv_btn_wrong_other.png')} 
    key={i} style={{left:kclass.left * zoom - halfItemWidth, top: kclass.top * zoom - halfItemHeight}} />
}

export function getPollResultEl(kclass, zoom, i, val) {
    let halfItemWidth = kclass.height * zoom * kclass.scaleX  / 2;
    let halfItemHeight = kclass.width * zoom * kclass.scaleY / 2;
    return <i key={i} style={{left:kclass.left * zoom, 
                              top: kclass.top * zoom - halfItemHeight}}
                className= {classnames('flag-answer iconfont_fl')}>
                {val[kclass.name] ? val[kclass.name] : kclass.name ? 0 : ''}
            </i>
}

export function getReactHtmlEl(type, klass, sliderValue, csMargin, i, option = {}) {
    let scaleYNum = klass.height * sliderValue * klass.scaleX  / 2;
    let scaleXNum = klass.width * sliderValue * klass.scaleY / 2;
    if(type == 'readItOut') {
        return <div key={i} className="record-box" style={{
                position: 'absolute',
                opacity: klass.getOpacity(),
                zIndex: 100 - i,
                top: klass.top * sliderValue - scaleYNum, 
                left: klass.left * sliderValue + csMargin -  scaleXNum,
                width: klass.width * sliderValue * klass.scaleX + 1, 
                height: klass.height * sliderValue * klass.scaleY + 1}} >
            <div className="record-bg slow-walk"></div>
            <div className="icon-bg">
            <img className='icon-record'
                 src={klass.getSrc()}/>
            </div>
        </div>
    }
    if(type == 'gif') {
        return <img key={i} className='el-html' style={{
                opacity: klass.getOpacity(),
                zIndex: 100 - i,
                top: klass.top * sliderValue - scaleYNum, 
                left: klass.left * sliderValue + csMargin -  scaleXNum,
                width: klass.width * sliderValue * klass.scaleX + 1, 
                height: klass.height * sliderValue * klass.scaleY + 1}} 
                src={klass.getSrc()}/>
    } 
    if(type == 'video') {
        return <video key={i} ref={'video'+i} className='el-html' autoPlay={option.autoPlay}  style={{
                zIndex: 100 - i, 
                top: klass.top * sliderValue - scaleYNum, 
                left: klass.left * sliderValue + csMargin - scaleXNum,
                width: klass.width * sliderValue * klass.scaleX + 1, 
                height: klass.height * sliderValue * klass.scaleY + 1,
                }} 
                src={klass.videoUrl} />
    }
    if(type == 'videoCtr') {
        return <i className='iconfont_fl el-video-play' key={i + 'r'} ref={`vPlayBtn${i}`}
            onClick={() => {
                if(this.refs['video' + i].paused) {
                    this.refs['video'+i].play();
                    this.refs['vPlayBtn'+i].innerHTML = '&#xe623;';
                } else {
                     this.refs['video'+i].pause();
                     this.refs['vPlayBtn'+i].innerHTML = '&#xe60c;';
                }
            }}
            style={{
                zIndex: 100 - i,
                top: klass.top * sliderValue + klass.height * klass.scaleY * sliderValue - 36 - scaleYNum,
                left: klass.left * sliderValue + csMargin + 10 - scaleXNum,
                width: 20, 
                height: 20}}>
                &#xe60c;
        </i>
    }
    if(type == 'iframe') {
        return <iframe key={i} className='el-iframe' src={klass.iframeUrl}
                style={{
                zIndex: 100 - i,
                top: klass.top * sliderValue - scaleYNum, 
                left: klass.left * sliderValue + csMargin - scaleXNum,
                width: klass.width * sliderValue * klass.scaleX + 1, 
                height: klass.height * sliderValue * klass.scaleY}}></iframe>
    }
}