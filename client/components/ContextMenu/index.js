import './index.less';
import 'react-contexify/dist/ReactContexify.min.css';
import React, { Component } from 'react';
import { Menu, Item, Separator, Submenu, animation } from 'react-contexify';
import NavMenu from 'components/NavMenu';

class ContextMenu extends Component{

    onItemClick = (item, e) => {                    
        this.props.onItemClick && this.props.onItemClick(item, e);
    }
    onTreeExpand = (info) => {
        this.props.onTreeExpand && this.props.onTreeExpand(info);
    }
    onTreeRightClick = (info) => {
        this.props.onTreeRightClick && this.props.onTreeRightClick(info);
    }
    onTreeDrop = (info) => {
        this.props.onTreeDrop && this.props.onTreeDrop(info);
    }
    getContent = () => {
        return (
            <Menu id='context-menu' animation={animation.fade}>
                <Submenu label="新建">
                    <Item>笔记</Item>
                    <Item>Markdown</Item>
                    <Item>文件夹</Item>
                </Submenu>
                <Separator />
                <Item>重命名</Item>
                <Item>删除</Item>
            </Menu>
        )
    }
    render(){
        return (
            <React.Fragment>
                <div id="context-menu"> 
                    <NavMenu 
                        navList={this.props.navList ? this.props.navList : []}
                        onTreeDrop={this.onTreeDrop}
                        onItemClick={this.onItemClick}
                        onTreeExpand={this.onTreeExpand}
                        onTreeRightClick={this.onTreeRightClick}
                    />
                </div> 
                {this.getContent()}
            </React.Fragment>
        )
    }
}

export default ContextMenu;