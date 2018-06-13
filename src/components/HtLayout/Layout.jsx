import React, { Component } from 'react';
import { Layout, Row, Col,Menu, Dropdown, Icon  } from 'antd';
import './Layout.css';
// import {BrowserRouter as Router} from 'react-router-dom';
import {Submenus,Contentbody} from '../../router/router'



const { Header, Sider } = Layout;


class HtLayout extends Component {
    
  render() {
    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a><Icon type="edit" /> 密码修改</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
            <a><Icon type="poweroff" /> 退出登录</a>
          </Menu.Item>
        </Menu>
    );
    return (
        // <Router>
            <Layout>
                <Header className="header">
                    <Row>
                        <Col span={6}>
                            <div className="logo">
                                后台管理系统
                            </div>
                        </Col>
                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6} style={{textAlign:'right'}}>
                            <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                    账户管理 <Icon type="down" />
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
            <Layout>
            <Sider width={200} style={{ background: '#fff' }}>   
                <Submenus />
            </Sider>
            <Contentbody />
            </Layout>
        </Layout>
        // </Router>
    );
  }
}


export default HtLayout;