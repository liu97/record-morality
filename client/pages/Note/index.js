import './index.less';
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Tree } from 'antd';
import TreeNav from './TreeNav';

const { TreeNode } = Tree;
const { Content, Sider } = Layout;

class Home extends Component{
    constructor(props){
		super(props);
		this.list =[
			{
				title: '最新笔记',
				className: 'recent',
				to: '/admin/note/recent',
                addition: 'recent',
                type: 'menu'
			},
			{
				title: '我的文件夹',
				className: 'folder',
				to: '/admin/note/folder',
                addition: 'folder',
                type: 'tree'
			},
			{
				title: '笔记趋势图',
				className: 'trendMap',
				to: '/admin/note/trendMap',
                addition: 'trendMap',
                type: 'menu'
			},
			{
				title: '草稿',
				className: 'unsaved',
				to: '/admin/note/unsaved',
                addition: 'unsaved',
                type: 'menu'
			}
		]
    }
    getNavList(){
        let list = this.list.map((item, index)=>{
            if(item.type == menu){}
        });
    }
	render(){
		return (
			<Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="recent">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <TreeNav />
                        <Menu.Item key="trendMap">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="unsaved">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
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