import React from 'react';
import { Layout,Breadcrumb,Table } from 'antd';
import {Link} from 'react-router-dom';
import reqwest from 'reqwest';
// import PublicFun from '../../components/publicFun/publicFun';
import {AddnewBtn} from '../../components/SearchIpt/SearchIpt';
import TableEdit from '../../components/TableEdit/TableEdit';
import BaseClass from '../../components/BaseClass/BaseClass';

const { Content } = Layout;



export default class Bannerlist extends BaseClass {
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
        // console.log(this.PublicFun.url)
        // console.log(PublicFun.url)
        this.fetch();
    }
    render() {
        const dataSource = [{
            key: '1',
            id:'1001',
            src: 'https://cdn.litongjinfu.com/public/banner/banner_gqrz.png',
            describe: '端午节',
            registTime:'20180402 08:30',
            sort: 1,
            action:<TableEdit  delClick={()=>this.UserDelete(2)} editHref='/' />
        }, {
            key: '2',
            id:'1001',
            src: 'https://cdn.litongjinfu.com/public/banner/banner_gqrz.png',
            describe: '端午节',
            registTime:'20180402 08:30',
            sort: 2,
            action:<TableEdit  delClick={()=>this.UserDelete(2)} editHref='/' />
        },];

        const columns = [{
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            sorter: false,
            width: '5%',
        }, {
            title: '图片',
            dataIndex: 'src',
            key: 'src',
            render:text=><img src={text} alt='banner图' />,
            className:'tablebanner',
            width: '25%',
        }, {
            title: '描述',
            dataIndex: 'describe',
            key: 'describe',
            width: '25%',
        },{
            title: '最近修改时间',
            dataIndex: 'registTime',
            key: 'registTime',
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
                    <Breadcrumb.Item>网站管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/userslist">轮播列表</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content className='Contentstyle'>
                    <div>
                        <Link to="/bannerAdd"><AddnewBtn /></Link>
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