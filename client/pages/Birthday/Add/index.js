import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';

const PREFIX = 'birthday-list';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		postArticleResult: state.postArticleResult
	})
)
class BirthdayAdd extends Component{
	constructor(props){
		super(props);


	}
	componentDidMount(){

	}
	UNSAFE_componentWillReceiveProps(newProps){
		
	}
	

	render(){
		return (
			<div></div>
		)
	}
}

export default withRouter(BirthdayAdd)