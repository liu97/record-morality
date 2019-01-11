import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Menu, Icon, Tree } from 'antd';
import NavMenu from 'components/NavMenu';
import { NAVLIST } from 'constants/treeNav';
import { fetchFolderTree } from 'actions/note/index';

const { Content, Sider } = Layout;
const PREFIX = 'note';

@connect(
    (state, props) => ({
        config: state.config,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    })
)
class Home extends Component{
    constructor(props){
		super(props);
    }

    componentDidMount(){
        this.props.dispatch(fetchFolderTree());
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