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
import { Tree, Icon, Input, Modal } from 'antd';
import { fetchFolderTree, updateFolderTree, addFolder } from 'actions/note.js';

import { CONTEXT_MENU } from 'constants/treeNav';

const { TreeNode } = Tree;

@connect(
    (state, props) => ({
        fetchFolderTreeResult: state.fetchFolderTreeResult,
        updateFolderTreeResult: state.updateFolderTreeResult,
        addFolderResult: state.addFolderResult,
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
            expandedKeys: [],
            modalVisible: false,
            modalValue: ''
        }
        this.currentRight = {}; // 当前右键操作
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchFolderTreeResult, updateFolderTreeResult, addFolderResult } = nextProps;
        if(!_.isEqual(fetchFolderTreeResult, this.props.fetchFolderTreeResult) && !fetchFolderTreeResult.isLoading){
            this.addAsyncList(fetchFolderTreeResult);
        }
        if(!_.isEqual(updateFolderTreeResult, this.props.updateFolderTreeResult) && !updateFolderTreeResult.isLoading){
            this.props.dispatch(fetchFolderTree());
        }
        if(!_.isEqual(addFolderResult, this.props.addFolderResult) && !addFolderResult.isLoading){
            let navTree = this.props.navTree;
            this.props.setSelectedKeys && this.props.setSelectedKeys([`${navTree.key}/${addFolderResult.data.id}`])
            this.hiddenModal();
            this.props.dispatch(fetchFolderTree());
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchFolderTree());
    }

    setExpandedKeys = (treeSelectedKeys) => { // selectedKeys改变时设置展开的节点
        let selectedItem = this.getFolderItem(treeSelectedKeys[0]);
        if(selectedItem){
            let expandedKeys = selectedItem.ancestors.map((item, index) => {
                if(!item){
                    return 0;
                }
                return item;
            });
            
            let oldExpandedKeys = _.cloneDeep(this.state.expandedKeys);
    
            expandedKeys = [...new Set([...expandedKeys, ...oldExpandedKeys])];
    
            this.setState({
                expandedKeys
            });
        }
    }

    addAsyncList = (treeList) => { // 把从数据库获取出来的文件夹信息加入到nav中
        let tree = _.cloneDeep(this.state.tree);
        tree.children = treeList.data;
        this.setState({tree}, ()=>{
            this.setExpandedKeys(this.props.treeSelectedKeys);
        })
    }

    getFolderItem = (key) => { // 根据文件夹key获取节点元素信息
        let tree = _.cloneDeep(this.state.tree);
        tree = _.isArray(tree) ? tree : [tree];

        let selectedItem;
        let id = this.getFolderId(key);
        const loop = (data, id, callback) => {
            data.forEach((item, index, arr) => {
                if (item.id === id) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, id, callback);
                }
            });
        };
        loop(tree, id, (item, index, arr) => {
            selectedItem = item;
        });

        return selectedItem;
    }
    
    getFolderId = (key) => { // 根据文件夹key回去文件夹id
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

    onExpand = (expandedKeys, info) => { // 展开tree节点
        this.setState({
            expandedKeys
        })

        this.props.onTreeExpand && this.props.onTreeExpand(expandedKeys, info);
    }

    onRightClick = (info) => { // 右键tree节点
        this.currentRight.key = info.node;
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

    onContextClick = (info) => { // 点击右键菜单的内容
        Object.assign(this.currentRight, info);
        this.showModal();
        this.props.onContextClick && this.props.onContextClick(this.currentRight);
    }

    getTreeNode = (data) => { // 返回文件夹树 
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
    getContent = (data) => { // 返回contextMenu的内容
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

    showModal = () => { // 显示modal
        this.setState({
            modalVisible: true,
        });
    }

    hiddenModal = () => { // 隐藏modal
        this.setState({
            modalVisible: false,
            modalValue: ''
        });
    }

    handleOk = () => { // modal返回确认
       if(this.currentRight.opt == 'new'){
           if(this.currentRight.extra.type == 'folder'){
               let parentId = this.getFolderId(this.currentRight.key.props.eventKey)
               this.props.dispatch(addFolder({name: this.state.modalValue, parentId}))
           }
       }
       else if(this.currentRight.opt == 'new'){}
    }

    modalChange = (e) => { // 修改modal里的值
        this.setState({
            modalValue: e.nativeEvent.data
        })
    }

    render() {
        const props = this.props;
        const treeNavClass = classNames({
            [props.className]: props.className != undefined,
            'tree-menu': true
        });

        return (
            <div className={treeNavClass}>
                <Tree
                    showIcon
                    draggable
                    selectedKeys={this.props.treeSelectedKeys}
                    expandedKeys={this.state.expandedKeys}
                    onDragEnter={this.onDragEnter}
                    onDrop={this.onDrop}
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    onRightClick={this.onRightClick}
                >
                    {this.getTreeNode(this.state.tree)}
                </Tree>
                {this.getContent(CONTEXT_MENU)}
                <Modal
                    title={this.currentRight.extra && this.currentRight.extra.type == 'folder' ? '请输入文件夹名' : '请输入文件名'}
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    confirmLoading={props.addFolderResult.isLoading}
                    onCancel={this.hiddenModal}
                >
                    <Input value={this.state.modalValue} onChange={this.modalChange} />
                </Modal>
            </div>
        );
    }
}

export default withRouter(TreeNav);