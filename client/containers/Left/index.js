import './index.less';
import React,{Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

class Left extends Component{
	render(){
		const activeList = this.props.history.location.pathname;
		const list =[
						{
							title: '博客管理系统',
							className: 'welcome-page',
							to: '/admin/',
							addition: '/home'
						},
						{
							title: '文章管理',
							className: 'list',
							to: '/admin/article/list',
							addition: '/article'
						},
						{
							title: '消息管理',
							className: 'list',
							to: '/admin/message/list',
							addition: '/message'
						}
					]
		return (
			<div className={'left-container'}>
			{list.map((item)=>{
				if( activeList.indexOf(item.addition)!=-1 ){
					item.className += ' active-list';
				}
				return <Link {...item} key={item.addition}>{item.title}</Link>
			})}
			</div>
		)
	}
}

export default withRouter(Left)