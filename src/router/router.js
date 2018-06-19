import React from 'react';
import {BrowserRouter as Router,Route, Switch, NavLink } from 'react-router-dom';
import HtLayout from '../components/HtLayout/Layout';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Userslist from '../pages/Users/Userlist';
import UsersAdd from '../pages/Users/UserAdd';
import PasswordReset from '../pages/Users/passwordReset';
import Bannerlist from '../pages/Banner/Bannerlist';
import BannerAdd from '../pages/Banner/BannerAdd';
import DTypelist from '../pages/DesignType/DTypeList';

import {WebState} from '../MobX/webState';
import {observer} from 'mobx-react';
// import LazyLoad from '../components/Loading/Loading'
// const SubMenu = Menu;
import { Menu, Icon,Layout} from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export class Submenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onClick=this.onClick.bind(this);
        this.onDeselect=this.onDeselect.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.onTitleClick = this.onTitleClick.bind(this)
    }
    onClick(item, key, keyPath ){
        console.log(item)
        console.log(key)
        console.log(keyPath )
    }
    onDeselect(item, key, selectedKeys  ){
        console.log(item, key, selectedKeys  )
    }
    onSelect(item, key, selectedKeys  ){
        console.log(item, key, selectedKeys )
    }
    onTitleClick(key, domEvent){
        console.log(key, domEvent)
    }
    componentDidMount() {
        console.log(WebState.Url)
        // console.log(this.props)
    }
    render() {
        return (
            <Menu
                mode="inline"
                // onClick={this.onClick}
                // onDeselect={this.onDeselect}
                // onSelect={this.onSelect}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" title={<span><Icon type="laptop" />网站管理</span>}>
                    <Menu.Item key="1">
                        <NavLink activeClassName='active' to="/">首页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" onTitleClick={this.onTitleClick}>
                        <NavLink activeClassName='active' to="/bannerlist">轮播列表</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink activeClassName='active' to="/designTypelist">设计类型</NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="user" />用户管理</span>}>
                    <Menu.Item key="5"><NavLink activeClassName='active' to="/userslist">用户列表</NavLink></Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}
export class MyRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login"  component={Login}/>
                    <Route path="/" render={()=> 
                        <HtLayout>
                            <Sider width={200} style={{ background: '#fff' }}>   
                                <Submenus/>
                            </Sider>
                            <Contentbody />
                        </HtLayout>
                    }/>
                </Switch>
            </Router>
        )
    }
}
// @observer
export class Contentbody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <div style={{width:'100%'}}>
                <Route  exact path="/" component={Home} />
                <Route path="/userslist" component={Userslist} onEnter={MenuEnter('sub2','5')}/>
                <Route path="/usersAdd" component={UsersAdd} onEnter={MenuEnter('sub2','')}/>
                <Route path="/passwordReset" component={PasswordReset} onEnter={MenuEnter('','')}/>
                <Route path="/bannerlist" component={Bannerlist} onEnter={MenuEnter('sub1','2')}/>
                <Route path="/bannerAdd" component={BannerAdd} onEnter={MenuEnter('sub1','2')}/>
                <Route path="/designTypelist" component={DTypelist} onEnter={MenuEnter('sub1','3')}/>
            </div>
        )
    }
}
class BaseRoute extends React.Component {
    componentDidMount() {
        this.props.onRouteEnter(this.props.match); // 这里你可以根据需要传更多信息
    }
}
let MenuEnter=(defaultSelectedKeys,defaultOpenKeys)=>{
    // WebState.Url = [defaultSelectedKeys,defaultOpenKeys];
    // console.log(WebState.Url)
}