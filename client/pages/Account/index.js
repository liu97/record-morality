import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Form, Input, Button, message, Breadcrumb } from 'antd';
import { updatePassword } from 'actions/user';
import _ from 'lodash';

const { Header, Content } = Layout;
const FormItem = Form.Item;
const PREFIX = 'account';

@connect(
    (state, props) => ({
        updatePasswordResult: state.updatePasswordResult,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    })
)
@Form.create()
class Account extends Component{
    constructor(props){
        super(props);

    }

    UNSAFE_componentWillReceiveProps(nextProps){
        let { updatePasswordResult } = nextProps;
		if(!_.isEqual(updatePasswordResult,this.props.updatePasswordResult) &&updatePasswordResult && updatePasswordResult.isLoading === false) {
			if(updatePasswordResult.info.success){
                message.success("修改成功");
                this.props.history.goBack();
            }
            else{
                message.error(updatePasswordResult.info.msg);
            }
        }
    }

    handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
                if(values.newPassword != values.newPassword2){
                    this.props.form.setFields({
                        newPassword2: {
                            value: values.newPassword2,
                            errors: [new Error('两次填写的密码不一致')],
                        },
                    });
                }
				else{
                    delete values.newPassword2;
                    this.props.dispatch(updatePassword(values));
                    console.log('Received values of form: ', values);
                }
			}
		});
    }

    goBack = (e) => {
        this.props.history.goBack();
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
			  sm: { span: 8 },
			  md: { span: 8 },
			},
        };

		return (
            <Layout className={PREFIX}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>修改密码</Breadcrumb.Item>
                </Breadcrumb>
                <Content>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className={`${PREFIX}-form`}>
                    <FormItem label="请输入原密码">
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入原密码',
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem label="设置新的密码">
                        {getFieldDecorator('newPassword', {
                            rules: [{
                                    required: true, message: '请输入新的密码',
                                },
                                {
                                    min:6, message: '密码最少6位'
                                }
                            ],
                        })(
                            <Input type="password"  placeholder="密码最少6位"/>
                        )}
                    </FormItem>
                    <FormItem label="重复新的密码">
                        {getFieldDecorator('newPassword2', {
                            rules: [{
                                required: true, message: '请重复输入新的密码',
                            }],
                        })(
                            <Input type="password" placeholder="两次密码必须一致"/>
                        )}
                    </FormItem>

                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 8, offset: 8 },
                            md: { span: 8, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="submit">
                            修改
                        </Button>
                        <Button onClick={this.goBack} style={{marginLeft: '16px'}}>
                            返回
                        </Button>
                    </FormItem>
                </Form>
                </Content>
            </Layout>
		)
	}
}

export default withRouter(Account)