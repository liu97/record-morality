import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Menu, Icon, Tree } from 'antd';
import NavMenu from 'components/NavMenu';
import { NAVLIST } from 'constants/treeNav';
import { fetchFolderTree } from 'actions/note/';

const { Content, Sider } = Layout;
const PREFIX = 'note';

@connect(
    (state, props) => ({
        fetchFolderTreeResult: state.fetchFolderTreeResult,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    })
)
class Note extends Component{
    constructor(props){
        super(props);
        this.state = {
            navList : NAVLIST
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        let { fetchFolderTreeResult } = nextProps;

        if(!_.isEqual(fetchFolderTreeResult, this.props.fetchFolderTreeResult) && !fetchFolderTreeResult.isLoading){
            this.addAsyncList(fetchFolderTreeResult);
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchFolderTree());
    }

    addAsyncList = (treeList) => { // 把从数据库获取出来的文件夹信息加入到nav中
        let list = _.cloneDeep(NAVLIST)

        list.forEach(item => {
            if(item.key == '/admin/note/folder'){
                item.children = treeList.data;
            }
        });

        this.setState({
            navList: list
        })
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
                            navList={this.state.navList}
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

export default Note