import React, {Component} from 'react';
import { Layout,Breadcrumb } from 'antd';
import {Link} from 'react-router-dom';
import BaseClass from '../../components/BaseClass/BaseClass';
import { Form, Input, Icon, Button,Upload } from 'antd';
const FormItem = Form.Item;

const { Content } = Layout;
  
class RegistrationForm extends BaseClass {
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
                label="描述"
            >
                {getFieldDecorator('describe', {
                rules: [ {
                    required: true, message: 'Please input your describe!',
                }],
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="图片"
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
            <FormItem
                {...formItemLayout}
                label="排序"
                >
                {getFieldDecorator('sort', {
                rules: [ {
                    required: true, message: 'Please input your sort!',
                }],
                })(
                <Input />
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
                    <Breadcrumb.Item>网站管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/userslist">轮播列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/userslist">轮播新增</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content className='Contentstyle'>
                    <WrappedRegistrationForm />
                </Content>
            </Layout>
        )
    }
}