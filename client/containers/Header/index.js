import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

class Head extends Component{
	constructor(props){
		super(props);
		this.list =[
			{
				title: '笔记',
				className: 'note',
				to: '/admin/note/recent',
				addition: 'note'
			},
			{
				title: '生日提醒',
				className: 'birthday',
				to: '/admin/birthday/',
				addition: 'birthday'
			}
		]
	}
	getActiveKey(url = this.props.history.location.pathname){
		let result = url.split('/');
		return result[2];
	}
	render(){
		const activeKey = this.getActiveKey();
		return (
			<Header className="header">
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					selectedKeys={[activeKey]}
					style={{ lineHeight: '64px' }}
				>
					{this.list.map((item)=>{
						return (
							<Menu.Item key={item.addition}>
								<Link {...item}>{item.title}</Link>
							</Menu.Item>
						)
					})}
				</Menu>
			</Header>
		)
	}
}

export default withRouter(Head)