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
            expandedKeys: [],
            modalVisible: false,
            modalValue: ''
        }
        this.currentRight = {}; // 当前右键操作
        this.inputRef = React.createRef();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchFolderTreeResult, updateFolderTreeResult, addFolderResult, deleteFolderResult, addNoteResult } = nextProps;
        // if(!_.isEqual(fetchFolderTreeResult, this.props.fetchFolderTreeResult) && !fetchFolderTreeResult.isLoading){
        //     this.addAsyncList(fetchFolderTreeResult);
        // }
        if(!_.isEqual(updateFolderTreeResult, this.props.updateFolderTreeResult) && !updateFolderTreeResult.isLoading){
            this.props.dispatch(fetchFolderTree());

            this.hiddenModal();

            message.success('修改文件夹成功');
        }
        if(!_.isEqual(addFolderResult, this.props.addFolderResult) && !addFolderResult.isLoading){
            let { opt, extra, key } = this.currentRight;
            this.setExpandedKeys(key.props.eventKey);
            this.onSelect(String(addFolderResult.info.data.id));

            this.props.dispatch(fetchFolderTree());
            
            this.hiddenModal();
            message.success('新建文件夹成功');
        }
        if(!_.isEqual(deleteFolderResult, this.props.deleteFolderResult) && !deleteFolderResult.isLoading){
            let { opt, extra, key } = this.currentRight;
            let fatherFolderId = this.getFolderItem(key.props.eventKey).ancestors.slice(-1)[0];
            let fatherFolderKey = String(fatherFolderId);
            if(fatherFolderKey){
                let brotherFolder = this.getFolderItem(fatherFolderKey).children.indexOf();
                if(brotherFolder){
                    let brotherFolderKey = String(brotherFolder.id);
                    this.onSelect(brotherFolderKey);
                }
                else{
                    this.onSelect(fatherFolderKey);
                }
            }

            this.props.dispatch(fetchFolderTree());

            message.success('删除文件夹成功');
        }
        if(!_.isEqual(addNoteResult, this.props.addNoteResult) && !addNoteResult.isLoading){
            let { opt, extra, key } = this.currentRight;
            this.onSelect(key.props.eventKey);

            this.props.dispatch(updateSelectedNote({id: addNoteResult.info.data.id}))
            this.props.dispatch(updateNoteStatus({status: 'edit'}))

            this.hiddenModal();
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchFolderTree());

        // let key = this.getActiveKey();
        // debugger
        // if(key != this.props.updateSelectedKeysResult.keys[0] && this.setExpandedKeys(key)){
        //     this.props.setSelectedKeys(key);
        // }
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
    
    }

    getActiveKey = (url = this.props.history.location.pathname) => {
        let result = url.replace(/\/$/, '').split('/').slice(-1);
		return result[0];
    }

    setExpandedKeys = (expandKey) => { // 需要展开的某个节点
        let expandItem = this.getFolderItem(expandKey);
        
        if(expandItem){
            let expandedKeys = expandItem.ancestors.map((item, index) => {
                if(!item){
                    return '0';
                }
                return String(item);
            });
            expandedKeys.push(String(expandItem.id)); // 展开的节点为祖先和自己
            
            let oldExpandedKeys = _.cloneDeep(this.state.expandedKeys);

            expandedKeys = [...new Set([...expandedKeys, ...oldExpandedKeys])];
            this.setState({
                expandedKeys
            });

            return true;
        }
        return false;
    }

    // addAsyncList = (treeList) => { // 把从数据库获取出来的文件夹信息加入到nav中
    //     let tree = _.cloneDeep(this.state.tree);
    //     tree.children = treeList.info.data;
    //     this.setState({tree})
    // }

    getFolderItem = (key) => { // 根据文件夹key获取节点元素信息
        if(key != undefined){
            let result = this.props.fetchFolderTreeResult;
            let tree = _.cloneDeep(result.info.data);

            let selectedItem;
            if(tree){
                let id = Number(key);
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
            }
            
            return selectedItem;
        }
    }

    onDrop = (info) => { // 拖动文件夹
        const dropId = Number(info.node.props.eventKey);
        const dragId = Number(info.dragNode.props.eventKey);

        this.props.dispatch(updateFolderTree({id: dragId, parentId: dropId}))
        
        this.props.onTreeDrop && this.props.onTreeDrop(info);
    }

    onSelect = (selectedKeys, e) => { // 点击tree节点, 此处添加这个函数是为了能导航，因为Link不能包含Tree
        let key = selectedKeys;
        if(Array.isArray(selectedKeys)){
            key = selectedKeys[0];
        }
        if(key){
            this.props.history.push(key);
            this.props.onTreeSelect && this.props.onTreeSelect(key, e);
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
        let navTree = this.props.fetchFolderTreeResult.info.data[0];
        if(info.node.props.eventKey == navTree.id){
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
            let id = Number(key.props.eventKey);
            this.props.dispatch(deleteFolder({id}))
        }
        else{
            this.showModal();
        }

        this.props.onContextClick && this.props.onContextClick(this.currentRight);
    }

    getTreeNode = (data) => { // 返回文件夹树 
        let tree = _.cloneDeep(data);
        let result = tree.map((item) => {
            if (item.children && item.children.length) {
                return (<TreeNode 
                            key={item.id} 
                            title={item.name}
                            icon={(props) => {
                                return (<Icon type={props.expanded ? 'folder-open' : 'folder'} />)
                            }}
                        >
                            {this.getTreeNode(item.children)}
                        </TreeNode>);
            }
            return (<TreeNode 
                        key={item.id} 
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
        let id = Number(key.props.eventKey);
        
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
        const result = this.props.fetchFolderTreeResult;
        const treeNavClass = classNames({
            [props.className]: props.className != undefined,
            'tree-menu': true
        });
        let typeName = this.currentRight.extra && this.getTypeName(this.currentRight.extra.type)

        return (
            <div className={treeNavClass}>
                {
                    result.info.data && <Tree
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
                        {this.getTreeNode(result.info.data)}
                    </Tree>
                }
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