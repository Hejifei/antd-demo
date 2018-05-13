import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Userslist from '../pages/Users/Userlist';
// import LazyLoad from '../components/Loading/Loading'
// const SubMenu = Menu;
// const { Sider } = Layout;
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;


export class Submenus extends React.Component {
    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" title={<span><Icon type="laptop" />首页</span>}>
                    <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="user" />用户管理</span>}>
                    <Menu.Item key="2"><Link to="/userslist">用户列表</Link></Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}
export class Contentbody extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/userslist" component={Userslist}/>
            </Switch>
            )
    }
}
