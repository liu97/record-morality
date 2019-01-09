import React, { Component } from 'react';
import _ from 'lodash';
import { Tree, Icon } from 'antd';
import { TREE } from 'constants/treeNav';

const { TreeNode } = Tree;

class TreeNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            gData: TREE,
        }
    }

    onDragEnter = (info) => {
        

    }

    onDrop = (info) => {
        console.log(info);
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.id == key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = _.cloneDeep(this.state.gData);

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
            gData: data,
        });
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return (<TreeNode 
                            key={item.id} 
                            title={item.name}
                            icon={(props) => {
                                return (<Icon type={props.expanded ? 'folder-open' : 'folder'} />)
                            }}
                        >
                            {loop(item.children)}
                        </TreeNode>);
            }
            return (<TreeNode 
                        key={item.id} 
                        title={item.name}  
                        icon={<Icon type= 'folder'/>}
                    />);
        });
        return (
        <Tree
            className="draggable-tree"
            showIcon
            draggable
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
        >
            {loop(this.state.gData)}
        </Tree>
        );
    }
}

export default TreeNav;