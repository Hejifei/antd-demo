import React, { Component } from 'react';
import { Button,Input,Menu,Dropdown,message,DatePicker  } from 'antd';
import './SearchIpt.css';

const {  RangePicker } = DatePicker;

export class Labinput extends Component {
  render() {
    return (
        <label className='searchlab'>
            {this.props.labtext}：
            <Input placeholder={this.props.plchold} id={this.props.iptid}/>
        </label>
    );
  }
}
export class SearchBtn extends Component{
  render(){
    return(<Button className='mg_R30' type="primary" icon="search">Search</Button>)
  }
}

export class AddnewBtn extends Component{
  render(){
    return(<Button className='mg_R30' type="primary" icon="plus">Add New</Button>)
  }
}

export class Labselect extends Component {
  constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  handleMenuClick(e) {
      message.info('Click on menu item.');
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="0" value='女'>女</Menu.Item>
        <Menu.Item key="1" value='男'>男</Menu.Item>
      </Menu>
    );
    return (
      <label className='searchlab'>
        {/* <select><option>男</option></select> */}
        {this.props.labtext}：
          <Dropdown.Button overlay={menu}>
            Sex
          </Dropdown.Button>
      </label>
    );
  }
}

export class LabinputDate extends Component {
  render(){
    return (
      <label className='searchlab'>
            {this.props.labtext}：
            <RangePicker/>
        </label>
    )
  }
}