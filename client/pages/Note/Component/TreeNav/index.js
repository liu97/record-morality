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
import { Tree, Icon, Input, Modal, message } from 'antd';
import { fetchFolderTree, updateFolderTree, addFolder, deleteFolder, addNote, updateNoteStatus, updateSelectedNote } from 'actions/note.js';

import { CONTEXT_MENU } from 'constants/treeNav';

const { TreeNode } = Tree;

@connect(
    (state, props) => ({
        fetchFolderTreeResult: state.fetchFolderTreeResult,
        updateFolderTreeResult: state.updateFolderTreeResult,
        addFolderResult: state.addFolderResult,
        deleteFolderResult: state.deleteFolderResult,
        updateSelectedKeysResult: state.updateSelectedKeysResult,
        addNoteResult: state.addNoteResult,
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
        this.inputRef = React.createRef();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchFolderTreeResult, updateFolderTreeResult, addFolderResult, deleteFolderResult, addNoteResult } = nextProps;
        if(!_.isEqual(fetchFolderTreeResult, this.props.fetchFolderTreeResult) && !fetchFolderTreeResult.isLoading){
            this.addAsyncList(fetchFolderTreeResult);
        }
        if(!_.isEqual(updateFolderTreeResult, this.props.updateFolderTreeResult) && !updateFolderTreeResult.isLoading){
            this.props.dispatch(fetchFolderTree());

            this.hiddenModal();

            message.success('修改文件夹成功');
        }
        if(!_.isEqual(addFolderResult, this.props.addFolderResult) && !addFolderResult.isLoading){
            let { opt, extra, key } = this.currentRight;
            this.setExpandedKeys(key.props.eventKey);

            this.props.setSelectedKeys(this.getFolderKey(addFolderResult.info.data.id));
            this.hiddenModal();

            this.props.history.push(this.getFolderKey(addFolderResult.info.data.id));

            this.props.dispatch(fetchFolderTree());

            message.success('新建文件夹成功');
        }
        if(!_.isEqual(deleteFolderResult, this.props.deleteFolderResult) && !deleteFolderResult.isLoading){
            let { opt, extra, key } = this.currentRight;
            let eventId = this.getFolderId(key.props.eventKey);
            let fatherFolderId = this.getFolderItem(key.props.eventKey).ancestors.slice(-1)[0];
            let fatherFolderKey = this.getFolderKey(fatherFolderId);
            if(fatherFolderKey){
                let brotherFolder = this.getFolderItem(fatherFolderKey).children.indexOf();
                if(brotherFolder){
                    let brotherFolderKey = this.getFolderKey(brotherFolder.id);
                    this.onSelect([brotherFolderKey])
                }
                else{
                    this.onSelect([fatherFolderKey]);
                }
            }

            this.props.dispatch(fetchFolderTree());

            message.success('删除文件夹成功');
        }
        if(!_.isEqual(addNoteResult, this.props.addNoteResult) && !addNoteResult.isLoading){
            let { opt, extra, key } = this.currentRight;
            this.setExpandedKeys(key.props.eventKey);
            this.props.setSelectedKeys(key.props.eventKey);
            this.props.history.push(key.props.eventKey);

            this.props.dispatch(updateSelectedNote({id: addNoteResult.info.data.id}))
            this.hiddenModal();

            this.props.dispatch(updateNoteStatus({status: 'edit'}))
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchFolderTree());
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.modalVisible && this.state.modalVisible != prevState.modalVisible){
            setTimeout(()=>{
                if(this.inputRef.current){
                    this.inputRef.current.focus();
                    this.inputRef.current.select();
                }
                
            },500)
        }
        
        let key = this.getActiveKey();
        if(key != this.props.updateSelectedKeysResult.keys[0] && this.setExpandedKeys(key)){
            this.props.setSelectedKeys(key);
        }
    
    }

    getActiveKey = (url = this.props.history.location.pathname) => {
        let result = url.replace(/\/$/, '');
		return result;
    }

    setExpandedKeys = (expandKey) => { // 需要展开的某个节点
        let expandItem = this.getFolderItem(expandKey);
        
        if(expandItem){
            let expandedKeys = expandItem.ancestors.map((item, index) => {
                if(!item){
                    return this.getFolderKey(0);
                }
                return this.getFolderKey(item);
            });
            expandedKeys.push(this.getFolderKey(expandItem.id)); // 展开的节点为祖先和自己
            
            let oldExpandedKeys = _.cloneDeep(this.state.expandedKeys);

            expandedKeys = [...new Set([...expandedKeys, ...oldExpandedKeys])];
            this.setState({
                expandedKeys
            });

            return true;
        }
        return false;
    }

    addAsyncList = (treeList) => { // 把从数据库获取出来的文件夹信息加入到nav中
        let tree = _.cloneDeep(this.state.tree);
        tree.children = treeList.info.data;
        this.setState({tree})
    }

    getFolderItem = (key) => { // 根据文件夹key获取节点元素信息
        if(key != undefined){
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
    }
    
    getFolderId = (key) => { // 根据文件夹key获取文件夹id
        if(key != undefined){
            let id =  key.split('/').pop();
            return Number(id);
        }
    }

    getFolderKey = (id) => { // 根据文件夹id获取文件夹key
        if(id != undefined){
            let navTree = this.props.navTree;
            let key = `${navTree.key}/${id}`;
            return key;
        }
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
        if(info.node.props.eventKey == this.getFolderKey(navTree.id)){
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

        let { opt, extra, key } = this.currentRight;

        if(opt == "rename"){
            this.showModal(key.props.title);
        }
        else if(this.currentRight.opt == "delete"){
            let id = this.getFolderId(this.currentRight.key.props.eventKey);
            this.props.dispatch(deleteFolder({id}))
        }
        else{
            this.showModal();
        }

        this.props.onContextClick && this.props.onContextClick(this.currentRight);
    }

    getTreeNode = (data) => { // 返回文件夹树 
        let tree = _.cloneDeep(data);
        tree = _.isArray(tree) ? tree : [tree];
        let result = tree.map((item) => {
            if (item.children && item.children.length) {
                return (<TreeNode 
                            key={this.getFolderKey(item.id)} 
                            title={item.name}
                            icon={(props) => {
                                return (<Icon type={props.expanded ? 'folder-open' : 'folder'} />)
                            }}
                        >
                            {this.getTreeNode(item.children)}
                        </TreeNode>);
            }
            return (<TreeNode 
                        key={this.getFolderKey(item.id)} 
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
                            onClick = {this.onContextClick.bind(this, item.clickInfo)}
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

    showModal = (modalValue) => { // 显示modal
        this.setState({
            modalVisible: true,
            modalValue
        });
    }

    hiddenModal = () => { // 隐藏modal
        this.setState({
            modalVisible: false,
            modalValue: ''
        });
    }

    handleOk = () => { // modal返回确认
        let { opt, extra, key } = this.currentRight;
        let id = this.getFolderId(key.props.eventKey);
        
        if(opt == 'new'){
            if(extra.type == 'folder'){
                this.props.dispatch(addFolder({name: this.state.modalValue, parentId: id}));
            }
            else{
                this.props.dispatch(addNote({title: this.state.modalValue, folderId: id, content: '', noteType: extra.type}))
            }
        }
        else if(this.currentRight.opt == 'rename'){
            this.props.dispatch(updateFolderTree({name: this.state.modalValue, id}))
        }
    }

    modalChange = (e) => { // 修改modal里的值
        this.setState({
            modalValue: e.target.value
        })
    }

    getTypeName = (type) => {
        switch(type){
            case 'folder':
                return '文件夹';
                break;
            case 'txt':
                return '笔记';
                break;
            case 'md':
                return 'markdown';
                break;
            default:
                return '';
        }
            
    }

    render() {
        const props = this.props;
        const treeNavClass = classNames({
            [props.className]: props.className != undefined,
            'tree-menu': true
        });
        let typeName = this.currentRight.extra && this.getTypeName(this.currentRight.extra.type)

        return (
            <div className={treeNavClass}>
                <Tree
                    showIcon
                    draggable
                    selectedKeys={props.updateSelectedKeysResult.keys}
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
                    title={`请输入${typeName}名`}
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.hiddenModal}
                >
                    <Input 
                        ref={this.inputRef} 
                        value={this.state.modalValue} 
                        onChange={this.modalChange} 
                        placeholder={typeName} />
                </Modal>
            </div>
        );
    }
}

export default withRouter(TreeNav);