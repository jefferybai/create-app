import React, { Component } from 'react'
import {Icon} from 'antd'
import './style.less'

export const CardTitle = ({title}) => (
    <div className='card-sg-title'><Icon className='icon' type="appstore" />  {title}</div>
)

export const AvatarTitle = ({url, title}) => (
    <div className='avatarTitle'>
        <img src={url}/>
        <div className='title'>{title}</div>
    </div>
)