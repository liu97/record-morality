import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Menu, Icon, Dropdown } from 'antd';
import classNames from 'classnames';
import ContextMenu from '../TreeNav';
import { updateSelectedKeys } from 'actions/note.js';

@connect(
    (state, props) => ({
        updateSelectedKeysResult: state.updateSelectedKeysResult,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    })
)
class NavMenu extends Component{
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
        this.props.dispatch(updateSelectedKeys({keys:[key]}));
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
    onTreeExpand = (info) => {
        this.props.onTreeExpand && this.props.onTreeExpand(info);
    }
    onTreeRightClick = (info) => {
        this.props.onTreeRightClick && this.props.onTreeRightClick(info);
    }
    onTreeDrop = (info) => {
        this.props.onTreeDrop && this.props.onTreeDrop(info);
    }
    handleAddNote = (noteType) => {
        this.props.handleAddNote('新建文件',noteType);
    }
    getDropDown(){
        return (
            <Menu>
                <Menu.Item key="0" onClick={this.handleAddNote.bind(this, 'txt')}>
                    <span>笔记</span>
                </Menu.Item>
                <Menu.Item key="1" onClick={this.handleAddNote.bind(this, 'md')}>
                    <span>markdown</span>
                </Menu.Item>
            </Menu>
        )
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
            else if(item.type == 'tree'){
                return (
                    <ContextMenu 
                        key={item.key}
                        treeSelectedKeys={props.updateSelectedKeysResult.keys}
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
                    <Menu.Item key={item.key}>
                        <Dropdown  overlay={this.getDropDown()} trigger={['click']}>
                            <span>
                                {item.icon && <Icon type={item.icon}></Icon>}
                                <span>{item.title}</span>
                            </span>
                        </Dropdown>
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

export default withRouter(NavMenu)