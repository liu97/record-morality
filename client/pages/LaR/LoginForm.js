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
                        {getFieldDecorator('email', {
                            rules: [{ type: 'email', message: '请输入正确格式的email!' },{ required: true, message: '请输入email!' }],
                        })(
                            <Input prefix={<Icon type="aliwangwang" style={{ color: 'rgba(250,82,82,1)' }} />} placeholder="邮箱" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(250,82,82,1)' }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="lag-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
		)
	}
}

export default LoginForm;