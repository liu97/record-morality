import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message, Card, Form, Button, Input, DatePicker, InputNumber   } from 'antd';

import { getGivenSearch } from 'utils/location';
import { addBirthday, fetchBirthdayList } from 'actions/birthday';
const { TextArea } = Input;
const PREFIX = 'birthday-add';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		addBirthdayResult: state.addBirthdayResult,
		fetchBirthdayListResult: state.fetchBirthdayListResult,
	})
)
@Form.create()
class BirthdayAdd extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		if(this.pageType != 'add'){
			let search = getGivenSearch(this.props, ['id']);
			this.props.dispatch(fetchBirthdayList(search));
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		let { addBirthdayResult } = nextProps;
		if(addBirthdayResult !== this.props.addBirthdayResult &&addBirthdayResult && addBirthdayResult.isLoading === false) {
			if(addBirthdayResult.info.success){
				this.props.history.push('/admin/birthday/list');
			}
		}
	}

	getActivePage = (url = this.props.history.location.pathname) => {
        let result = url.replace(/\/$/, '').split('/').slice(-1);
		return result[0];
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if(values.date){
					values.date = values.date.format('YYYY-MM-DD');
				}

				for(let key of Object.keys(values)){
					if(values[key] == undefined){
						delete values[key];
					}
				}

				this.props.dispatch(addBirthday(values));
				console.log('Received values of form: ', values);

			}
		});
	}

	render(){
		this.pageType = this.getActivePage();
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
			  xs: { span: 24 },
			  sm: { span: 8 },
			  md: { span: 8 },
			},
			wrapperCol: {
			  xs: { span: 24 },
			  sm: { span: 16 },
			  md: { span: 8 },
			},
		};

		return (
			<Card
				title="基本信息"
				className={PREFIX}
				>
				<div className={`${PREFIX}-container`}>
					<Form {...formItemLayout} onSubmit={this.handleSubmit} className={`${PREFIX}-form`}>
						<Form.Item label="名字">
							{getFieldDecorator('name', {
								rules: [{
									required: true, message: '请输入寿星的名字',
								}],
							})(
								<Input />
							)}
						</Form.Item>
						<Form.Item label="生日日期">
							{getFieldDecorator('date', {
								rules: [{
									required: true, message: '请输入生日日期',
								}],
							})(
								<DatePicker style={{width:'100%'}} placeholder=""/>
							)}
						</Form.Item>
						<Form.Item label="提前提醒天数">
							{getFieldDecorator('advanceDay', {
								initialValue: 0,
								rules: [{
									required: true, message: '请输入提前提醒天数',
								}],
							})(
								<InputNumber style={{width:'100%'}}/>
							)}
						</Form.Item>
						<Form.Item label="提醒邮箱">
							{getFieldDecorator('email', {
								rules: [{
									type: 'email', message: '请输入正确的邮箱格式',
								}],
							})(
								<Input placeholder="默认为你的邮箱" />
							)}
						</Form.Item>
						<Form.Item label="备忘录">
							{getFieldDecorator('content')(
								<TextArea style={{minHeight: '80px'}} placeholder="你还想记点什么..." />
							)}
						</Form.Item>
						<Form.Item
							wrapperCol={{
								xs: { span: 24, offset: 0 },
								sm: { span: 16, offset: 8 },
								md: { span: 8, offset: 8 },
							}}
						>
							<Button type="primary" htmlType="submit" className="submit">
								添加
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Card>
		)
	}
}

export default withRouter(BirthdayAdd)