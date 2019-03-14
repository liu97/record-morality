import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import { checkNickName, checkEmail } from 'actions/lar';

import _ from 'lodash';

const FormItem = Form.Item;

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		checkNickNameResult: state.checkNickNameResult,
		checkEmailResult: state.checkEmailResult
	})
)
@Form.create()
class RegisterForm extends Component{
    constructor(props){
        super(props);

        this.deDispatchCheckName = _.debounce(this.dispatchCheckName, 800);
        this.deDispatchCheckEmail = _.debounce(this.dispatchCheckEmail, 800);
        
    }

    UNSAFE_componentWillReceiveProps(newProps){
        let { checkNickNameResult, checkEmailResult } = newProps;
		const props = this.props;
		if(checkNickNameResult !== props.checkNickNameResult && checkNickNameResult && checkNickNameResult.isLoading === false){
			this.responseNickName(checkNickNameResult)
        }
        if(checkEmailResult !== props.checkEmailResult && checkEmailResult && checkEmailResult.isLoading === false){
			this.responseEmail(checkEmailResult)
		}
    }

    validateNickName = (rule, value, callback) => { // 检验昵称是否可用
        if(value){ // 如果没填写昵称，不用发送请求
            this.deDispatchCheckName(value, callback);
        }
        else{
            callback();
        }
    }

    dispatchCheckName = (nickName, callback) => { // 发送检查昵称的请求
        this.props.dispatch(checkNickName({nickName}));
        this.checkCallback = callback;
    }
    
    responseNickName = (result) => { // 检验昵称是否可用的回调
        let form = this.props.form;
        if(!result.info.success){
            this.checkCallback(result.info.msg);
        }
        else{
            this.checkCallback();
        }
    }

    validateEmail = (rule, value, callback) => { // 检验昵称是否可用
        if(value){ // 如果没填写昵称，不用发送请求
            this.deDispatchCheckEmail(value, callback);
        }
        else{
            callback();
        }
    }

    dispatchCheckEmail = (email, callback) => { // 发送检查昵称的请求
        this.props.dispatch(checkEmail({email}));
        this.checkCallback = callback;
    }
    
    responseEmail = (result) => { // 检验昵称是否可用的回调
        let form = this.props.form;
        if(!result.info.success){
            this.checkCallback(result.info.msg);
        }
        else{
            this.checkCallback();
        }
    }

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
                        {getFieldDecorator('nickName', {
                            rules: [{ required: true, message: '请输入昵称!' }, {validator: this.validateNickName}],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(250,82,82,1)' }} />} placeholder="nickName" autoComplete="off" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(250,82,82,1)' }} />} type="password" placeholder="password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ type: 'email', message: '请输入正确格式的email!' },{ required: true, message: '请输入email!' },{validator: this.validateEmail}],
                        })(
                            <Input prefix={<Icon type="aliwangwang" style={{ color: 'rgba(250,82,82,1)' }} />} placeholder="email" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="lag-form-button">
                            注册
                        </Button>
                    </FormItem>
                </Form>
            </div>
		)
	}
}

export default RegisterForm;