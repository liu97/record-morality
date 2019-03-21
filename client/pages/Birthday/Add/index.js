import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message, Card, Form, Button, Input, DatePicker  } from 'antd';
import moment from 'moment';

const PREFIX = 'birthday-add';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		postArticleResult: state.postArticleResult
	})
)
@Form.create()
class BirthdayAdd extends Component{
	constructor(props){
		super(props);


	}
	componentDidMount(){

	}
	UNSAFE_componentWillReceiveProps(newProps){
		
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if(values.date){
					values.date = values.date.foemat('YYYY-MM-DD');
				}
				console.log('Received values of form: ', values);
			}
		});
	}

	render(){
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
								<Input placeholder="名字" />
							)}
						</Form.Item>
						<Form.Item label="生日日期">
							{getFieldDecorator('date', {
								rules: [{
									required: true, message: '请输入生日日期',
								}],
							})(
								<DatePicker/>
							)}
						</Form.Item>
						<Form.Item label="提前提醒天数">
							{getFieldDecorator('advanceDay', {
								initialValue: 0,
								rules: [{
									required: true, message: '请输入提前提醒天数',
								}],
							})(
								<Input placeholder="提前提醒天数" />
							)}
						</Form.Item>
						<Form.Item label="提醒邮箱">
							{getFieldDecorator('email')(
								<Input placeholder="默认为你的邮箱" />
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