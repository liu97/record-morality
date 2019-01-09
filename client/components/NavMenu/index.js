import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import TreeNav from './Component/TreeNav';

class Home extends Component{
    constructor(props){
        super(props);
        this.navList = this.props.navList;
		
    }
    getActiveKey(url = this.props.history.location.pathname){
		let result = url.split('/');
		return result[2];
	}
    getNavList(){
        let navList = this.navList.map((item, index)=>{
            if(item.type == 'nav'){
                return (
                    <Menu.Item key={item.key}>
                        {item.icon && <Icon type={item.icon}></Icon>}
                        <Link to={item.to}>item.title</Link>
                    </Menu.Item>
                )
            }
            else if(item.type == 'tree'){
                return (
                    <TreeNav {...item}/>
                )
            }
            else{
                return (
                    <Menu.Item key={item.key}>
                        {item.icon && <Icon type={item.icon}></Icon>}
                        <span onClick={(e)=>{props.onClick(item, e)}}>item.title</span>
                    </Menu.Item>
                )
            }
        });
    }
	render(){
        const props = this.props;
		return (
            <Menu
                theme={props.theme ? props.theme : "dark"}
                mode={props.mode ? props.mode : "inline"}
                style={props.style ? props.style : { height: '100%', borderRight: 0 }}
            >
                {
                    
                }
                <Menu.Item key="recent">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>
                <TreeNav />
                <Menu.Item key="trendMap">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="unsaved">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>
            </Menu>
		)
	}
}

export default withRouter(Home)