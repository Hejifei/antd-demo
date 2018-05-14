import React, {Component} from 'react';
import { Layout,Breadcrumb } from 'antd';
import {Link} from 'react-router-dom';

import { Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, Button,Upload } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const { Content } = Layout;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
}];
  
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
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
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
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      );
  
      return (
        <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label="E-mail"
            >
                {getFieldDecorator('email', {
                rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                }, {
                    required: true, message: 'Please input your E-mail!',
                }],
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Password"
            >
                {getFieldDecorator('password', {
                rules: [{
                    required: true, message: 'Please input your password!',
                }, {
                    validator: this.validateToNextPassword,
                }],
                })(
                <Input type="password" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Confirm Password"
            >
                {getFieldDecorator('confirm', {
                rules: [{
                    required: true, message: 'Please confirm your password!',
                }, {
                    validator: this.compareToFirstPassword,
                }],
                })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={(
                <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Habitual Residence"
            >
                {getFieldDecorator('residence', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                })(
                <Cascader options={residences} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Phone Number"
            >
                {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="Dragger"
            >
            <div className="dropbox">
                {getFieldDecorator('dragger', {
                    rules: [{ required: true, message: 'Please click ro drag to upload file!' }],
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                })(
                <Upload.Dragger name="files">
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
                )}
            </div>
                </FormItem>
            <FormItem {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                    rules: [{ required: true, message: 'Please read the!' }],
                    valuePropName: 'checked',
                })(
                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
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
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/userslist">用户列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/usersAdd">用户新增</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content className='Contentstyle'>
                    <WrappedRegistrationForm />
                </Content>
            </Layout>
        )
    }
}