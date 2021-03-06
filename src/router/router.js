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

@observer
export class Submenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            SMenuList:[
                {
                    'SubMenu':'sub1',
                    'Icon_type':'laptop',
                    'title':'网站管理',
                    'sons':[
                        {'url':'/index','name':'首页'},
                        {'url':'/bannerlist','name':'轮播列表'},
                        {'url':'/designTypelist','name':'设计类型'},
                    ]
                },
                {
                    'SubMenu':'sub2',
                    'Icon_type':'user',
                    'title':'用户管理',
                    'sons':[
                        {'url':'/userslist','name':'用户列表'}
                    ]
                }
            ],
            defaultOpenKeysVal:[],
            defaultSelectedKeysVal:[],
            temp:''
        };
    }
    componentWillMount() {
        console.log(WebState.Url)
    }

    render() {
        let url = WebState.Url ? WebState.Url : '';
        const SMenuList = this.state.SMenuList;
        // this.state.temp='';
        SMenuList.map((val,index)=>{
            // this.state.temp +=`
            //     <SubMenu key="${val.SubMenu}" title={<span><Icon type="${val.Icon_type}" />${val.title}</span>}>
            //     `
            val.sons.map((valson,indexson)=>{
                // this.state.temp +=`
                //     <Menu.Item key="${val.SubMenu+(indexson+1)}">
                //         <NavLink activeClassName='active' to="${valson.url}">${valson.name}</NavLink>
                //     </Menu.Item>
                // `
                if(url.indexOf(valson.url) !== -1){
                    this.state.defaultOpenKeysVal.push(val.SubMenu)
                    this.state.defaultSelectedKeysVal.push(val.SubMenu + (indexson+1))
                }
                return '';
            })
            // this.state.temp +=`</SubMenu>`
            return '';
        })
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={this.state.defaultSelectedKeysVal}
                defaultOpenKeys={this.state.defaultOpenKeysVal}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" title={<span><Icon type="laptop" />网站管理</span>}>
                    <Menu.Item key="sub11">
                        <NavLink activeClassName='active' to="/index">首页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="sub12" onTitleClick={this.onTitleClick}>
                        <NavLink activeClassName='active' to="/bannerlist">轮播列表</NavLink>
                    </Menu.Item>
                    <Menu.Item key="sub13">
                        <NavLink activeClassName='active' to="/designTypelist">设计类型</NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="user" />用户管理</span>}>
                    <Menu.Item key="sub21"><NavLink activeClassName='active' to="/userslist">用户列表</NavLink></Menu.Item>
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
                <Route  exact path="/index" component={Home} />
                {/* <Redirect from='/' to='/index' /> */}
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
// class BaseRoute extends React.Component {
//     componentDidMount() {
//         this.props.onRouteEnter(this.props.match); // 这里你可以根据需要传更多信息
//     }
// }
let MenuEnter=(defaultSelectedKeys,defaultOpenKeys)=>{
    // WebState.Url = [defaultSelectedKeys,defaultOpenKeys];
    // console.log(WebState.Url)
}