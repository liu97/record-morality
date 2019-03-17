import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
            navList: this.props.navList,
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
        let key = this.getActiveKey();
        this.onItemClick(key);
    }

    getActiveKey = (url = this.props.history.location.pathname) => {
        let result = url.replace(/\/$/, '').split('/').slice(-1);
		return result[0];
    }

    setSelectedKeys = (key) => {
        this.updateSelectedKeys && this.props.dispatch(this.updateSelectedKeys({keys:[key]}));
    }

    onItemClick = (item, e) => {
        if(item.type && item.type == 'nav'){
            this.setSelectedKeys(item.key);
            item = item.key;
        }
        else if(!item.type){
            this.setSelectedKeys(item);
        }    
        this.props.onClick && this.props.onClick(item);
    }
    getNavList(){
        const props = this.props;

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
            else{
                return (
                    <Menu.Item key={item.key}>
                        <span>
                            {item.icon && <Icon type={item.icon}></Icon>}
                            <span>{item.title}</span>
                        </span>
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
                selectedKeys={props.updateSelectedKeysResult.keys}
            >
                {this.getNavList()}
            </Menu>
		)
	}
}

export default Nav