import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as appActions from '../../actions/app'

import { Layout, Menu, Breadcrumb, Icon, Card, Avatar, Badge, Dropdown,
Row, Col, Progress, Table, Carousel} from 'antd';

import style from './style.less'
import {CardTitle, AvatarTitle} from '../../component/applets'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Home extends Component {
    static propTypes = {

    }
    

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        const DataView = ({num, title, color, pro = false}) => (
            <div className='data-view'>
                {
                    pro ? <Progress type="circle" percent={num} width={88} style={{marginLeft: 10}} /> : 
                    <div className='view-data'>
                        <large style={{color: color}}>{num}</large><small>兆瓦</small>
                    </div>
                }
                <p>{title}</p>
            </div>);

        const CardFactorty = ({title, u, p, k}) => (
            <Card className='card-sg-use' style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
                <img className='img' alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                <div className='title'>{title}</div>
                <div className="custom-card">
                    <div className='num-info'>
                        <p className='num num-u'>{u}</p>
                        <p className='num num-p'>{p}</p>
                    </div>
                    <div className='title-info'>
                        <p className='title'>用电量</p>
                        <p className='title'>计划用电</p>
                    </div>
                    <h3>考核电量</h3>
                    <h5>{k}兆瓦</h5>
                </div>
            </Card>
        )
        
        const columns = [{
            title: '电厂',
            dataIndex: 'name',
            width: 150,
        }, {
            title: '发电量',
            dataIndex: 'age',
            width: 150,
        }, {
            title: '计划电量',
            dataIndex: 'address',
        }];
        
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
            });
        }
        return (
            <div  className={style.rootCls}>
                <Card bodyStyle={{ padding: 0 }} bordered={false} className='card-sg' title={<CardTitle title='用电情况汇总'/>}
                    style={{ width: '100%', marginBottom:'20px'}}>
                    <Row className="row-use-total" gutter={1}>
                        <Col span={5}><DataView color='#26bce6' num={300} title="总购电量"></DataView></Col>
                        <Col span={5}><DataView  color='#7268b8'  num={180} title="已用电量"></DataView></Col>
                        <Col span={5}><DataView  color='#fadc6e' pro={true}  num={30} title="用电进度"></DataView></Col>
                        <Col span={5}><DataView  color='#fadc6e'  num={-120} title="偏差电量"></DataView></Col>
                        <Col span={4}><DataView  color='#fdb56f'  num={-144} title="考核电量"></DataView></Col>
                    </Row>
                </Card>

                <Card className='card-sg' bodyStyle={{ padding: '10px 10px' }} title={<CardTitle title='大用户用电情况'/>} bordered={false} style={{ width: '100%' }}>
                    <Carousel dots={true} autoplay speed={6000} arrows={true}>
                        <div>
                            <Row gutter={10}>
                                <Col span={6}>
                                    <CardFactorty title='华能国际电力' u={50} p={100} k={-100}/>
                                </Col>
                                <Col span={6}>
                                    <CardFactorty title='华能国际电力' u={50} p={100} k={-100}/>
                                </Col>
                                <Col span={6}>
                                    <CardFactorty title='华能国际电力' u={50} p={100} k={-100}/>
                                </Col>
                                <Col span={6}>
                                    <CardFactorty title='华能国际电力' u={50} p={100} k={-100}/>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row gutter={10}>
                                <Col span={6}>
                                    <CardFactorty title='华能国际电力' u={50} p={100} k={-100}/>
                                </Col>
                                <Col span={6}>
                                    <CardFactorty title='华能国际电力' u={50} p={100} k={-100}/>
                                </Col>
                                <Col span={6}>
                                    <CardFactorty title='华能国际电力' u={50} p={100} k={-100}/>
                                </Col>
                                <Col span={6}>
                                    <CardFactorty title='华能国际电力' u={50} p={100} k={-100}/>
                                </Col>
                            </Row>
                        </div>
                    </Carousel>
                </Card>

                <Card bodyStyle={{ padding: 0 }} className='card-sg' title={<CardTitle title='电厂发电情况'/>} bordered={false} style={{ width: '100%' }}>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state',state)
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))