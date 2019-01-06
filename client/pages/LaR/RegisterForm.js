import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

@Form.create()
class RegisterForm extends Component{
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.handleSubmit(values);
			}
		});
	  }
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
            <div className={'main-form'}>
                <Form onSubmit={this.handleSubmit} className="lag-form">
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入你的名字!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(250,82,82,1)' }} />} placeholder="name" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入你的密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(250,82,82,1)' }} />} type="password" placeholder="password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ type: 'email', message: '请输入正确格式的email!' },{ required: true, message: '请输入你的email!' }],
                        })(
                            <Input prefix={<Icon type="aliwangwang" style={{ color: 'rgba(250,82,82,1)' }} />} placeholder="email" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="lag-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
		)
	}
}

export default RegisterForm;