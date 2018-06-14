import React, {Component} from 'react';
import { Layout,Breadcrumb,Table } from 'antd';
import {Link} from 'react-router-dom';
import reqwest from 'reqwest';
import {AddnewBtn} from '../../components/SearchIpt/SearchIpt';
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
            name: '城市规划设计',
            registTime:'20180402 08:30',
            action:<TableEdit  delClick={()=>this.UserDelete(2)} editHref='/' />
        }, {
            key: '2',
            id:'1002',
            name: '旅游规划设计',
            registTime:'20180403 10:18',
            action:<TableEdit  delClick={()=>this.UserDelete(2)} editHref='/' />
        },];

        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '33.3%',
        },  {
            title: '添加时间',
            dataIndex: 'registTime',
            key: 'registTime',
            width: '33.3%',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: '33.3%',
        }];

        return (
            <Layout className='ContentLayoutC'> 
                <Breadcrumb className='BreadcrumbC'>
                    <Breadcrumb.Item>网站管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/userslist">设计类型</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content className='Contentstyle'>
                    <div>
                        <Link to="/usersAdd"><AddnewBtn /></Link>
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