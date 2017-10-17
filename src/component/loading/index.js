/**
 * Created by zhangjing on 17/6/27.
 */
import React from 'react'
import styles from './style.less';
import classnames from 'classnames';

export default ({progress, style}) => (
    <div className={classnames(styles.rootCls, {show: progress != 100})} style={style}>
        <div className='loader_overlay'></div>
        <div className='loader_cogs'>
            <div className='loader_cogs__top'></div>
            <div className='loader_cogs__left'></div>
            <div className='loader_cogs__bottom'></div>
        </div>
    </div>
)