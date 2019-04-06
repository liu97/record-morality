import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message, Card } from 'antd';
import _ from 'lodash';
import BirthdayForm from '../Component/BirthdayForm';

import { addBirthday } from 'actions/birthday';
const PREFIX = 'birthday-add';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		addBirthdayResult: state.addBirthdayResult,
	})
)
class BirthdayAdd extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
	
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		let { addBirthdayResult } = nextProps;
		if(!_.isEqual(addBirthdayResult,this.props.addBirthdayResult) &&addBirthdayResult && addBirthdayResult.isLoading === false) {
			if(addBirthdayResult.info.success){
				this.props.history.push('/admin/birthday/list');
			}
		}
	}
	
	handleSubmit = (values) => {
		this.props.dispatch(addBirthday(values))
	}

	render(){
		return (
			<Card
				title="基本信息"
				className={PREFIX}
				>
				<div className={`${PREFIX}-container`}>
					<BirthdayForm 
						mode={'add'}
						handleSubmit={this.handleSubmit}
					>
					</BirthdayForm>
				</div>
			</Card>
		)
	}
}

export default withRouter(BirthdayAdd)