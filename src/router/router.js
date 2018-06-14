import React from 'react';
import {BrowserRouter as Router,Route, Switch, NavLink} from 'react-router-dom';
import HtLayout from '../components/HtLayout/Layout';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Userslist from '../pages/Users/Userlist';
import UsersAdd from '../pages/Users/UserAdd';
import PasswordReset from '../pages/Users/passwordReset';
import Bannerlist from '../pages/Banner/Bannerlist';
import BannerAdd from '../pages/Banner/BannerAdd';
import DTypelist from '../pages/DesignType/DTypeList';
// import LazyLoad from '../components/Loading/Loading'
// const SubMenu = Menu;
import { Menu, Icon} from 'antd';
// const { Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;


export class Submenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" title={<span><Icon type="laptop" />网站管理</span>}>
                    <Menu.Item key="1"><NavLink activeClassName='active' to="/">首页</NavLink></Menu.Item>
                    <Menu.Item key="2"><NavLink activeClassName='active' to="/bannerlist">轮播列表</NavLink></Menu.Item>
                    <Menu.Item key="3"><NavLink activeClassName='active' to="/designTypelist">设计类型</NavLink></Menu.Item>
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
                    <Route path="/" component={HtLayout} />
                </Switch>
            </Router>
        )
    }
}
export class Contentbody extends React.Component {
    render() {
        return (
            <div style={{width:'100%'}}>  
                {/* <Sider width={200} style={{ background: '#fff' }}>   
                    <Submenus />
                </Sider> */}
                <Route exact path="/" component={Home}/>
                <Route path="/userslist" component={Userslist}/>
                <Route path="/usersAdd" component={UsersAdd}/>
                <Route path="/passwordReset" component={PasswordReset}/>
                <Route path="/bannerlist" component={Bannerlist}/>
                <Route path="/bannerAdd" component={BannerAdd}/>
                <Route path="/designTypelist" component={DTypelist}/>
            </div>
            )
    }
}
