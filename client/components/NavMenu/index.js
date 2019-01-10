import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import TreeNav from 'components/TreeNav'
class Home extends Component{
    constructor(props){
        super(props);
        this.navList = this.props.navList;
        this.state = {
            selectedKeys: [],
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
        if(item.type && item.type != 'tree'){
            this.setState({
                selectedKeys : [item.key]
            })
        }
        else{
            this.setState({
                selectedKeys : item
            })
        }
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
    getNavList(){
        let navList = this.navList.map((item, index)=>{
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
                    <TreeNav 
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
		return (
            <Menu
                theme={props.theme ? props.theme : "light"}
                mode={props.mode ? props.mode : "inline"}
                style={props.style ? props.style : { height: '100%', borderRight: 0 }}
                selectedKeys={this.state.selectedKeys}
            >
                {
                    this.getNavList()
                }
            </Menu>
		)
	}
}

export default withRouter(Home)