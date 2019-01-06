import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

@Form.create()
class LoginForm extends Component{
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
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(250,82,82,1)' }} />} placeholder="name" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(250,82,82,1)' }} />} type="password" placeholder="password" />
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

export default LoginForm;