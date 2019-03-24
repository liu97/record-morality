import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message, Card } from 'antd';
import BirthdayForm from '../Component/BirthdayForm';
import { getGivenSearch } from 'utils/location';
import { fetchBirthdayList, updateBirthday } from 'actions/birthday';
const PREFIX = 'birthday-edit';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		fetchBirthdayListResult: state.fetchBirthdayListResult,
		updateBirthdayResult: state.updateBirthdayResult,
	})
)
class BirthdayEdit extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
        this.props.dispatch(fetchBirthdayList(this.search));
	}

	UNSAFE_componentWillReceiveProps(nextProps){
        let { updateBirthdayResult } = nextProps;
		if(updateBirthdayResult !== this.props.updateBirthdayResult &&updateBirthdayResult && updateBirthdayResult.isLoading === false) {
			if(updateBirthdayResult.info.success){
				this.props.history.push('/admin/birthday/list');
			}
		}
	}
	
	handleSubmit = (values) => {
        if(Object.prototype.toString(values) == '[object Object]'){
            Object.assign(values, this.search);
        }
		this.props.dispatch(updateBirthday(values))
	}

	render(){
        this.search = getGivenSearch(this.props, ['id']);
        const birthday = this.props.fetchBirthdayListResult 
                        && this.props.fetchBirthdayListResult.info 
                        && this.props.fetchBirthdayListResult.info.data
                        && this.props.fetchBirthdayListResult.info.data[0];
		return (
			<Card
				title="基本信息"
				className={PREFIX}
				>
				<div className={`${PREFIX}-container`}>
					<BirthdayForm 
                        mode={'edit'}
                        birthday={birthday}
						handleSubmit={this.handleSubmit}
					>
					</BirthdayForm>
				</div>
			</Card>
		)
	}
}

export default withRouter(BirthdayEdit)