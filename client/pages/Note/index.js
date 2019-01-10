import './index.less';
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Tree } from 'antd';
import NavMenu from 'components/NavMenu';
import { NAVLIST } from 'constants/treeNav';

const { Content, Sider } = Layout;
const PREFIX = 'note';

class Home extends Component{
    constructor(props){
		super(props);
		
    }
	render(){
		return (
            <Layout className={PREFIX}>
                <Sider className={`${PREFIX}-sider`}>
                    <Menu
                        mode="inline"
                        className={`${PREFIX}-menu`}
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
                <Layout>
                    <Breadcrumb>
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