import React, {Component} from 'react';
import { Layout,Breadcrumb,Table } from 'antd';
import reqwest from 'reqwest';
import {Labinput,SearchBtn,Labselect,LabinputDate} from '../../components/SearchIpt/SearchIpt';
import TableEdit from '../../components/TableEdit/TableEdit';


const { Content } = Layout;



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {total:200},
            loading: false,
          };
        this.UserDelete = this.UserDelete.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    UserDelete(id){
        alert('id='+id);
    }

    handleTableChange(pagination, filters, sorter){
        // 分页、排序、筛选变化时触发
        console.log(pagination);
        console.log(filters); 
        console.log(sorter); 
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });       
    }

    // ajax
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
          url: 'https://randomuser.me/api',
          method: 'get',
          data: {
            results: 10,
            ...params,
          },
          type: 'json',
        }).then((data) => {
          const pagination = { ...this.state.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.setState({
            loading: false,
            data: data.results,
            pagination,
          });
        });
      }



      componentDidMount() {
        this.fetch();
      }
    render() {
        const dataSource = [{
            key: '1',
            id:'1001',
            name: '何必',
            age: 5,
            registTime:'20180402 08:30',
            address: '西湖区湖底公园1号',
            action:<TableEdit  delClick={()=>this.UserDelete(2)} editHref='/' />
        }, {
            key: '2',
            id:'1002',
            name: '何苦',
            age: 2,
            registTime:'20180403 10:18',
            address: '西湖区湖底公园1号',
            action:<TableEdit  delClick={()=>this.UserDelete(2)} editHref='/' />
        },];

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            width: '15%',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: '15%',
        }, {
            title: '注册时间',
            dataIndex: 'registTime',
            key: 'registTime',
            width: '25%',
        },{
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            width: '25%',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: '20%',
        }];

        return (
            <Layout className='ContentLayoutC'> 
                <Breadcrumb className='BreadcrumbC'>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/userslist">用户列表</a></Breadcrumb.Item>
                </Breadcrumb>
                <Content className='Contentstyle'>
                    <div>
                        <Labinput labtext={'用户名'} iptid={'username'} plchold={'User Name'}/>
                        <Labinput labtext={'手机号'} iptid={'phone'} plchold={'Phone Number'}/>
                        <Labselect labtext={'性别'} />
                        <LabinputDate labtext={'注册日期'} iptid={'phone'} plchold={'Phone Number'}/>
                        <SearchBtn />
                        
                    </div>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        loading={this.state.loading}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                        className='textCenter' />
                </Content>
            </Layout>
        )
    }
}