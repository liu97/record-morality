import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Menu, Icon, Tree } from 'antd';
import NavMenu from 'components/NavMenu';
import { NAVLIST } from 'constants/treeNav';
import { fetchFolderTree } from 'actions/note/';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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

    onTreeRightClick = (info) => {
        this.setState({
            rightClickTreeItem: {
                pageX: info.event.pageX,
                pageY: info.event.pageY,
                id: info.node.props["eventKey"],
                categoryName: info.node.props["title"]
            }
          });

    }

    getTreeRightClickMenu = () => {
        const { pageX, pageY, id, categoryName } = { ...this.state.rightClickTreeItem };
        const tmpStyle = {
            position: "absolute",
            left: `${pageX - 20}px`,
            top: `${pageY - 60 }px`
        };
        const menu = (
            <div style={tmpStyle} className="self-right-menu">
                <Menu mode="vertical">
                    <SubMenu key="sub1" title={<span>新建</span>}>
                        <Menu.Item key="1">笔记</Menu.Item>
                        <Menu.Item key="2">Markdown</Menu.Item>
                        <Menu.Item key="3">文件</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5">重命名</Menu.Item>
                    <Menu.Item key="6">删除</Menu.Item>
                </Menu>
            </div>
        );
        return this.state.rightClickTreeItem == null ? "" : menu;
    };

    

    onItemClick = (info, e) => {
        console.log(info);
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
                            onTreeDrop={this.onTreeDrop}
                            onItemClick={this.onItemClick}
                            onTreeExpand={this.onTreeExpand}
                            onTreeRightClick={this.onTreeRightClick}
                        />
                    </Menu>
                    {this.getTreeRightClickMenu()}
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