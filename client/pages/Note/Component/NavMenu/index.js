import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';
import ContextMenu from '../TreeNav';
class NavMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            navList: this.props.navList,
            selectedKeys: [],
        }
		
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { navList } = nextProps;
        if(navList && !_.isEqual(navList, this.props.navList)){
            this.setState({
                navList
            })
        }
    }

    componentDidMount(){
        this.setState({
            selectedKeys: [this.getActiveKey()]
        })
    }

    getActiveKey = (url = this.props.history.location.pathname) => {
        let result = url.replace(/\/$/, '');
		return result;
    }
    onItemClick = (item, e) => {
        if(item.type && item.type == 'nav'){
            this.setState({
                selectedKeys : [item.key]
            });
            item = item.key;
        }
        else if(!item.type){
            this.setState({
                selectedKeys : [item]
            })
        }                     
        this.props.onClick && this.props.onClick(item, e);
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
    getNavList(){
        let navList = this.state.navList && this.state.navList.map((item, index)=>{
            if(item.type == 'nav'){
                return (
                    <Menu.Item key={item.key} onClick={(e)=>{ this.onItemClick(item, e) }}>
                        {item.icon && <Icon type={item.icon}></Icon>}
                        <Link to={item.to}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            else if(item.type == 'tree'){
                return (
                    <ContextMenu 
                        key={item.key}
                        treeSelectedKeys={this.state.selectedKeys}
                        navTree={item}
                        onTreeDrop={this.onTreeDrop}
                        onTreeSelect={this.onItemClick}
                        onTreeExpand={this.onTreeExpand}
                        onTreeRightClick={this.onTreeRightClick}
                    />
                )
            }
            else{
                return (
                    <Menu.Item key={item.key} onClick={(e)=>{ this.onItemClick(item, e) }}>
                        {item.icon && <Icon type={item.icon}></Icon>}
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }
        });

        return navList;
    }
	render(){
        const props = this.props;
        const navMenuClass = classNames({
            [props.className]: props.className != undefined,
            'nav-menu': true
        })
		return (
            <Menu
                theme={props.theme ? props.theme : "light"}
                mode={props.mode ? props.mode : "inline"}
                className={navMenuClass}
                selectedKeys={this.state.selectedKeys}
            >
                {this.getNavList()}
            </Menu>
		)
	}
}

export default withRouter(NavMenu)