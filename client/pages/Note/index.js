import './index.less';
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Tree } from 'antd';
import NavMenu from 'components/NavMenu';
import { NAVLIST } from 'constants/treeNav';

const { Content, Sider } = Layout;

class Home extends Component{
    constructor(props){
		super(props);
		
    }
	render(){
		return (
			<Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <NavMenu 
                            navList={NAVLIST}
                            onDrop={this.onDrop}
                            onSelect={this.onClick}
                            onExpand={this.onExpand}
                            onRightClick={this.onRightClick}
                        />
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                    }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
		)
	}
}

export default Home