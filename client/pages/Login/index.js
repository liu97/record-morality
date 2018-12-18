import './index.less';
import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { PostLoginMessage } from 'actions/login';
import { message } from 'antd';
import { getCookie } from 'utils/cookie';
import { setCookie } from 'utils/cookie';

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
	handleSubmit = (values) => {
		console.log('Received values of form: ', values);
		this.props.dispatch(PostLoginMessage(values));
	}
	render(){
		return (
			<div className={'login'}>
				<div className={'login-cover'}></div>
				<div className={'login-main'}>
					<div className={'main-header'}>博客管理系统</div>
					<LoginForm handleSubmit={this.handleSubmit}></LoginForm>
				</div>
			</div>
		)
	}
}

export default Home;