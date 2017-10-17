import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as appActions from '../../actions/app'

import {HashRouter, Route, Link} from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Icon, Card, Avatar, Badge, Dropdown,
Row, Col} from 'antd';

import style from './style.less'
import {CardTitle, AvatarTitle} from '../../component/applets'

import Home from '../home';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SG extends Component {
    static propTypes = {

    }

    state = {collapsed: false,};

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        const menu = (
            <Menu>
              <Menu.Item key="0">
                <a href="http://www.alipay.com/">1st menu item</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3">3d menu item</Menu.Item>
            </Menu>
          );

        return (
            <HashRouter>
                <Layout className={style.rootCls} style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}>
                        <div className='logo'>
                            <header>
                                <div className='title'>售电运营管理平台</div>
                                <small>shell shal power system</small>
                            </header>
                            <div className='content'>
                                <div className='avatar'> 
                                    <img className='photo' src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'/>
                                    <div className='name'>曲向阳</div>
                                </div>
                            </div>
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="line-chart" /><span>实时监控</span></span>}>
                                <Menu.Item key="1">电量监控</Menu.Item>
                                <Menu.Item key="2">电费监控</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={<span><Icon type="environment" /><span>GIS展示</span></span>}>
                                <Menu.Item key="3">电量监控</Menu.Item>
                                <Menu.Item key="4">电费监控</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={<span><Icon type="bar-chart" /><span>综合分析</span></span>}>
                                <Menu.Item key="3">电量监控</Menu.Item>
                                <Menu.Item key="4">电费监控</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={<span><Icon type="search" /><span>自主查询</span></span>}>
                                <Menu.Item key="3">电量监控</Menu.Item>
                                <Menu.Item key="4">电费监控</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub5"
                                title={<span><Icon type="file-text" /><span>合约管理</span></span>}>
                                <Menu.Item key="3">电量监控</Menu.Item>
                                <Menu.Item key="4">电费监控</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub6"
                                title={<span><Icon type="bank" /><span>结算管理</span></span>}>
                                <Menu.Item key="3">电量监控</Menu.Item>
                                <Menu.Item key="4">电费监控</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub7"
                                title={<span><Icon type="dot-chart" /><span>偏差管理</span></span>}>
                                <Menu.Item key="3">电量监控</Menu.Item>
                                <Menu.Item key="4">电费监控</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub8"
                                title={<span><Icon type="compass" /><span>抄表管理</span></span>}>
                                <Menu.Item key="3">电量监控</Menu.Item>
                                <Menu.Item key="4">电费监控</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className='header' >
                            <Breadcrumb>
                                <Breadcrumb.Item href="">
                                <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="">
                                <Icon type="user" />
                                <span>Application List</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Application
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div className='header-info'>
                                <Row>
                                    <Col span={6}>
                                        <Badge count={5}>
                                            <Icon className='tip-info' type="notification" />
                                        </Badge>
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown className='menu-info' overlay={menu} trigger={['click']}>
                                            <a className="ant-dropdown-link" href="#">
                                            曲向阳 <Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </Col>
                                    <Col span={6}>
                                        <Avatar size='large' className='photo-info' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Col>
                                </Row>
                            </div>
                        </Header>
                        <Content className='content'>
                            <Route exact path="/" component={Home}/>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </HashRouter>
        )
    }
}

export default SG