import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { message, Card, Form, Button, Input, DatePicker, InputNumber   } from 'antd';

const { TextArea } = Input;
const PREFIX = 'birthday-form';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		addBirthdayResult: state.addBirthdayResult,
		fetchBirthdayListResult: state.fetchBirthdayListResult,
	})
)
@Form.create()
class BirthdayForm extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	UNSAFE_componentWillReceiveProps(nextProps){

    }
    
    goBack = () => {
		this.props.history.goBack();
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
                this.props.handleSubmit && this.props.handleSubmit(values);
				console.log('Received values of form: ', values);
			}
		});
	}

	render(){
        const { birthday, mode } = this.props;
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
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className={`${PREFIX}-form`}>
                <Form.Item label="名字">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入寿星的名字',
                        }],
                        initialValue: birthday && birthday.name,
                    })(
                        <Input disabled={mode == 'detail'}/>
                    )}
                </Form.Item>
                <Form.Item label="生日日期">
                    {getFieldDecorator('date', {
                        rules: [{
                            required: true, message: '请输入生日日期',
                        }],
                        initialValue: (birthday && birthday.date) ? moment(birthday.date) : null,
                    })(
                        <DatePicker style={{width:'100%'}} placeholder="" disabled={mode == 'detail'}/>
                    )}
                </Form.Item>
                <Form.Item label="提前提醒天数">
                    {getFieldDecorator('advanceDay', {
                        rules: [{
                            required: true, message: '请输入提前提醒天数',
                        }],
                        initialValue: (birthday && birthday.advanceDay) || 0,
                    })(
                        <InputNumber style={{width:'100%'}} disabled={mode == 'detail'}/>
                    )}
                </Form.Item>
                <Form.Item label="提醒邮箱">
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '请输入正确的邮箱格式',
                        }],
                        initialValue: birthday && birthday.email,
                    })(
                        <Input placeholder="默认为你的邮箱" disabled={mode == 'detail'} />
                    )}
                </Form.Item>
                <Form.Item label="备忘录">
                    {getFieldDecorator('content', {
                        initialValue: birthday && birthday.content,
                    })(
                        <TextArea style={{minHeight: '80px'}} placeholder="你还想记点什么..." disabled={mode == 'detail'} />
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
                        {mode == 'edit' ? '确定' : '添加'}
                    </Button>
                    <Button onClick={this.goBack} style={{marginLeft: '16px'}}>
                        返回
                    </Button>
                </Form.Item>
            </Form>
		)
	}
}

export default withRouter(BirthdayForm)