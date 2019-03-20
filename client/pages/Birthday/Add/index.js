import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message, Card  } from 'antd';

const PREFIX = 'birthday-add';

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
			<Card
				title="基本信息"
				className={PREFIX}
				>
				<p>Card content</p>
				<p>Card content</p>
				<p>Card content</p>
			</Card>
		)
	}
}

export default withRouter(BirthdayAdd)