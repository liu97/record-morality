import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { PostLoginMessage } from 'actions/login';
import { message, Tabs, Icon } from 'antd';
import { getCookie, setCookie } from 'utils/cookie';

const TabPane = Tabs.TabPane;

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		postLoginResult: state.postLoginResult
	})
)
class Home extends Component{
	UNSAFE_componentWillMount(){
		const authed = getCookie('isLogin') == 'true';
		if(authed){
			this.props.history.push('/admin');
		}
	}
	UNSAFE_componentWillReceiveProps(newProps){
		let { postLoginResult } = newProps;
		const props = this.props;
		if(postLoginResult !== props.postLoginResult && postLoginResult && postLoginResult.isLoading === false){
			if(postLoginResult.code == 1){
				setCookie('isLogin', true);
				window.localStorage.setItem('access_token', postLoginResult.token);
				const bcakURL = props.location.state ? props.location.state.from.pathname : '/admin';
				props.history.push(bcakURL);
			}
			else{
				message.error(postLoginResult.message);
			}
		}
	}
	// 提交登录表单
	handleLoginSubmit = (values) => {
		console.log('Received values of form: ', values);
		this.props.dispatch(PostLoginMessage(values));
	}
	// 提交注册表单
	handleRegisterSubmit = (values) => {
		console.log('Received values of form: ', values);
		this.props.dispatch(PostLoginMessage(values));
	}
	render(){
		return (
			<div className={'lag'}>
				<div className={'lag-main'}>
					<h1 className={'main-header'}>记德笔记</h1>
					<Tabs defaultActiveKey="login">
					    <TabPane tab={<span>登录</span>} key="login">
					      	<LoginForm handleSubmit={this.handleLoginSubmit}></LoginForm>
					    </TabPane>
					    <TabPane tab={<span>注册</span>} key="register">
					      	<RegisterForm handleSubmit={this.handleRegisterSubmit}></RegisterForm>
					    </TabPane>
					 </Tabs>
				</div>
			</div>
		)
	}
}

export default Home;