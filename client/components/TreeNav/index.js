import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Tree, Icon } from 'antd';

const { TreeNode } = Tree;

class TreeNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            tree: props.navTree,
            selectedKeys: []
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { treeSelectedKeys, navTree } = nextProps;
        if(treeSelectedKeys && !_.isEqual(treeSelectedKeys, this.props.treeSelectedKeys)){
            this.setState({
                selectedKeys: treeSelectedKeys
            })
        }
        if(navTree && !_.isEqual(navTree, this.props.navTree)){
            this.setState({
                tree: navTree
            })
        }
    }

    onDrop = (info) => {
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (`${this.props.navTree.key}/${item.id}` == key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = _.cloneDeep(this.state.tree);

        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        } 
        else if ((info.node.props.children || []).length > 0 && info.node.props.expanded && dropPosition == 1) {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } 
        else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition == -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }
        this.setState({
            tree: data,
        });

        this.props.onTreeDrop && this.props.onTreeDrop(info);
    }

    onSelect = (selectedKeys, e) => { // 点击tree节点
        if(selectedKeys.length){
            this.props.history.push(selectedKeys[0]);
            this.props.onTreeSelect && this.props.onTreeSelect(selectedKeys, e);
        }
    }

    onExpand = (info) => { // 展开tree节点
        this.props.onTreeExpand && this.props.onTreeExpand(info);
    }

    onRightClick = (info) => { // 右键tree节点
        this.props.onTreeRightClick && this.props.onTreeRightClick(info); 
    }

    getTreeNode = (data) => { 
        let result = data.map((item) => {
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
    render() {
        let tree = _.cloneDeep(this.state.tree);
        tree = _.isArray(tree) ? tree : [tree];
        return (
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
            {this.getTreeNode(tree)}
        </Tree>
        );
    }
}

export default withRouter(TreeNav);