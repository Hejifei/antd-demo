import React, {Component} from 'react';
import { Layout,Breadcrumb,Timeline } from 'antd';
const { Content } = Layout;

export default class Home extends Component {
    state = {
        reverse: false,
    }
    

    render() {
        return (
            <Layout className='ContentLayoutC'> 
                <Breadcrumb className='BreadcrumbC'>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/">Application Center</a></Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
                <Content className='Contentstyle'>
                    {/* 时间轴 */}
                    <div>
                        <Timeline pending="To be continued..." reverse={this.state.reverse}>
                            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                        </Timeline>
                    </div>
                </Content>

            </Layout>
        )
    }
}