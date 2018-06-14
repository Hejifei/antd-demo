import React, {Component} from 'react';
import { Layout,Breadcrumb } from 'antd';
import {Link} from 'react-router-dom';

import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

const { Content } = Layout;
  
class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareTopasswordRequirement = (rule, value, callback) => {
        const reg = /^[\w_-]{6,20}$/;
        if (value && !reg.test(value)) {
          callback('请输入6~20位英文数字密码!');
        } else {
          callback();
        }
      }
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('newpassword')) {
        callback('两次输入的密码不一致!');
      } else {
        callback();
      }
    }
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if(value && form.getFieldValue('oldpassword') && value=== form.getFieldValue('oldpassword')){
        callback('新旧密码不能相同!');
      }
      else if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }
    render() {
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
  
      return (
        <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label="旧密码"
            >
                {getFieldDecorator('oldpassword', {
                    rules: [{
                        required: true, message: '请输入旧密码!',
                    },{
                        validator: this.compareTopasswordRequirement,
                    }],
                    })(
                    <Input type="password" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="新密码"
            >
                {getFieldDecorator('newpassword', {
                rules: [{
                    required: true, message: '请输入新密码!',
                },{
                    validator: this.compareTopasswordRequirement,
                },{
                    validator: this.validateToNextPassword,
                }],
                })(
                <Input type="password" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="确认密码"
            >
                {getFieldDecorator('confirm', {
                rules: [{
                    required: true, message: '请再次输入新密码!',
                },{
                    validator: this.compareTopasswordRequirement,
                },{
                    validator: this.compareToFirstPassword,
                }],
                })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
        </Form>
      );
    }
}
  
const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Layout className='ContentLayoutC'> 
                <Breadcrumb className='BreadcrumbC'>
                    <Breadcrumb.Item>账户管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/passwordReset">密码重置</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content className='Contentstyle'>
                    <WrappedRegistrationForm />
                </Content>
            </Layout>
        )
    }
}