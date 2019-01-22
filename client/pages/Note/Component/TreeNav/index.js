import './index.less';
import 'react-contexify/dist/ReactContexify.min.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import _ from 'lodash';
import { Menu, Item, Separator, Submenu, animation, contextMenu } from 'react-contexify';
import { Tree, Icon } from 'antd';
import { fetchFolderTree, updateFolderTree } from 'actions/note.js';

import { CONTEXT_MENU } from 'constants/treeNav';

const { TreeNode } = Tree;

@connect(
    (state, props) => ({
        fetchFolderTreeResult: state.fetchFolderTreeResult,
        updateFolderTreeResult: state.updateFolderTreeResult,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    })
)
class TreeNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            tree: props.navTree,
            selectedKeys: []
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { treeSelectedKeys, fetchFolderTreeResult, updateFolderTreeResult } = nextProps;
        if(treeSelectedKeys && !_.isEqual(treeSelectedKeys, this.props.treeSelectedKeys)){
            this.setState({
                selectedKeys: treeSelectedKeys
            })
        }
        if(!_.isEqual(fetchFolderTreeResult, this.props.fetchFolderTreeResult) && !fetchFolderTreeResult.isLoading){
            this.addAsyncList(fetchFolderTreeResult);
        }
        if(!_.isEqual(updateFolderTreeResult, this.props.updateFolderTreeResult) && !updateFolderTreeResult.isLoading){
            this.props.dispatch(fetchFolderTree());
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchFolderTree());
    }

    addAsyncList = (treeList) => { // 把从数据库获取出来的文件夹信息加入到nav中
        let tree = _.cloneDeep(this.state.tree);
        tree.children = treeList.data;
        this.setState({
            tree
        })
    }
    
    getFolderId = (key) => {
        let id =  key.split('/').pop();
        if(id == '0' || !id){
            id = null;
        }
        return id;
    }

    onDrop = (info) => { // 拖动文件夹
        const dropId = this.getFolderId(info.node.props.eventKey);
        const dragId = this.getFolderId(info.dragNode.props.eventKey);

        
        this.props.dispatch(updateFolderTree({id: dragId, parentId: dropId}))
        
        this.props.onTreeDrop && this.props.onTreeDrop(info);
    }

    onSelect = (selectedKeys, e) => { // 点击tree节点
        if(selectedKeys.length){
            this.props.history.push(selectedKeys[0]);
            this.props.onTreeSelect && this.props.onTreeSelect(selectedKeys[0], e);
        }
    }

    onExpand = (info) => { // 展开tree节点
        this.props.onTreeExpand && this.props.onTreeExpand(info);
    }

    onRightClick = (info) => { // 右键tree节点
        this.setState({
            currentRightKey : info.node
        });
        let navTree = this.props.navTree;
        if(info.node.props.eventKey == `${navTree.key}/${navTree.id}`){
            contextMenu.show({ // 显示右键菜单
                id: 'root-context-menu',
                ...info
            });
        }
        else{
            contextMenu.show({ // 显示右键菜单
                id: 'item-context-menu',
                ...info
            });
        }
        this.props.onTreeRightClick && this.props.onTreeRightClick(info); 
    }

    onContextClick = ({opt, extra}) => {
        let currentRightKey = this.state.currentRightKey;

        let info = {
            currentRightKey,
            opt,
            extra,
        }
        this.props.onContextClick && this.props.onContextClick(info);
    }

    getTreeNode = (data) => { 
        let tree = _.cloneDeep(data);
        tree = _.isArray(tree) ? tree : [tree];

        let result = tree.map((item) => {
            if (item.children && item.children.length) {
                return (<TreeNode 
                            key={`${this.props.navTree.key}/${item.id}`} 
                            title={item.name}
                            icon={(props) => {
                                return (<Icon type={props.expanded ? 'folder-open' : 'folder'} />)
                            }}
                        >
                            {this.getTreeNode(item.children)}
                        </TreeNode>);
            }
            return (<TreeNode 
                        key={`${this.props.navTree.key}/${item.id}`} 
                        title={item.name}  
                        icon={<Icon type= 'folder'/>}
                    />);
        });
        return result;
    }
    getContent = (data) => {
        let tree = _.cloneDeep(data);

        const loop = (arr) => {
            return arr.map((item, index) => {
                if(item.type == 'Menu'){
                    return (
                        <Menu id={item.id} key={item.id} animation={animation[item.animation]}>
                            {
                                loop(item.children)
                            }
                        </Menu>
                    )
                }
                else if(item.type == 'Submenu'){
                    return (
                        <Submenu label={item.label} key={item.label}>
                            {
                                loop(item.children)
                            }
                        </Submenu>
                    )
                }
                else if(item.type == 'Item'){
                    return (
                        <Item 
                            key={item.label}
                            onClick = {this.onContextClick.bind(this, item.onClick)}
                        >
                            {item.label}
                        </Item>
                    )
                }
                else if(item.type == 'Separator'){
                    return (
                        <Separator key={index}/>
                    )
                }
            });
        }

        return loop(tree);
    }
    render() {
        const props = this.props;

        const treeNavClass = classNames({
            [props.className]: props.className != undefined,
            'tree-menu': true
        })
        return (
            <div className={treeNavClass}>
                <Tree
                    showIcon
                    draggable
                    selectedKeys={this.state.selectedKeys}
                    onDragEnter={this.onDragEnter}
                    onDrop={this.onDrop}
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    onRightClick={this.onRightClick}
                >
                    {this.getTreeNode(this.state.tree)}
                </Tree>
                {this.getContent(CONTEXT_MENU)}
            </div>
        );
    }
}

export default withRouter(TreeNav);