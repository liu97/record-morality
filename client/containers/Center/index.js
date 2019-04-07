import './index.less';
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Avatar, Dropdown, Icon, Modal, Form, Button, Upload, Input } from 'antd';
import _ from 'lodash';
import { fetchUserInfo, updateUser } from 'actions/user';
import { setCookie } from 'utils/cookie';
const PREFIX = 'personal-center';
const { TextArea } = Input;

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		fetchUserInfoResult: state.fetchUserInfoResult,
		updateUserResult: state.updateUserResult,
	})
)
@Form.create()
class Center extends Component{
	constructor(props){
		super(props);
		this.state = {
            modalVisible: false,
            loading: false,
            avatarPath: null,
		}
    }

    UNSAFE_componentWillReceiveProps(nextProps){
		let { fetchUserInfoResult, updateUserResult } = nextProps;
		if(!_.isEqual(fetchUserInfoResult,this.props.fetchUserInfoResult) &&fetchUserInfoResult && fetchUserInfoResult.isLoading === false) {
			if(fetchUserInfoResult.info.success && fetchUserInfoResult.info.data[0]){
				this.setState({
                    avatarPath: fetchUserInfoResult.info.data[0].avatarPath,
                    loading: false,
                })
			}
        }
        if(!_.isEqual(updateUserResult, this.props.updateUserResult) &&updateUserResult && updateUserResult.isLoading === false) {
			if(updateUserResult.info.success){
				this.setState({
                    modalVisible: false,
                });
                this.props.dispatch(fetchUserInfo());
			}
		}
    }
    
    componentDidMount(){
        this.props.dispatch(fetchUserInfo({}));
    }

	showModal = () => {
        const { fetchUserInfoResult } = this.props;
        const user = fetchUserInfoResult.info.data[0];
		this.setState({
		  	modalVisible: true,
        });
        this.props.form.setFieldsValue({
            avatarPath: user.avatarPath,
            nickName: user.nickName,
            autograph: user.autograph
        })
	}
	
	handleCancelModal = (e) => {
		this.setState({
		  	modalVisible: false,
        });
        this.props.dispatch(fetchUserInfo({}));
    }
    
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            let avatarPath = info.file.response.data.url;
            this.setState({
                avatarPath,
                loading: false,
            })
            this.props.form.setFieldsValue({
                avatarPath
            });
        }
    }

    handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.dispatch(updateUser(values));
                console.log('Received values of form: ', values);
			}
		});
    }

    handleLogOff = (e) => { // 注销
        setCookie('isLogin', false);
        window.localStorage.setItem('access_token', '');
        this.props.history.push('/');
    }

	getCenterMenu = () =>{
		return (
			<Menu>
				<Menu.Item key="0">
					<a href="javascript:void(0);" onClick={this.showModal}>个人信息</a>
				</Menu.Item>
                <Menu.Item key="1">
					<Link to="/admin/account">账号设置</Link>
				</Menu.Item>
                <Menu.Divider />
				<Menu.Item key="2">
					<a href="javascript:void(0);" onClick={this.handleLogOff}>注销登录</a>
				</Menu.Item>
			</Menu>
		)
	}
	render(){
        const { avatarPath, loading, modalVisible } = this.state;
        const { form, fetchUserInfoResult } = this.props;
        const { getFieldDecorator } = form;
        let userInfo = {};
        if(fetchUserInfoResult.info.success && fetchUserInfoResult.info.data[0]){
            userInfo = fetchUserInfoResult.info.data[0];
        }
		const formItemLayout = {
			labelCol: {
			  sm: { span: 6 },
			  md: { span: 6 },
			},
			wrapperCol: {
			  sm: { span: 18 },
			  md: { span: 18 },
			},
        };
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
		return (
            <div className={PREFIX}>
                <Dropdown overlay={this.getCenterMenu} trigger={['click']}>
                    <div href="javascript:void(0);" className={'dropdown'}>
                        {avatarPath ? <Avatar src={avatarPath} size="large" /> : <Avatar icon="user" size="large" />} {userInfo.nickName} <Icon type="down" />
                    </div>
                </Dropdown>
                <Modal
                    title="个人中心"
                    visible={modalVisible}
                    onOk={this.handleOkModal}
                    onCancel={this.handleCancelModal}
                    footer={null}
                    centered={true}
                    >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className={`${PREFIX}-form`}>
                        <Form.Item label="头像">
                            <Upload
                                name="avatar-file"
                                action="/user/uploadImg"
                                listType="picture-card"
                                showUploadList={false}
                                onChange={this.handleChange}
                                headers={{'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`}}
                                >
                                {avatarPath ? <Avatar src={avatarPath} size={64} /> : uploadButton}
                            </Upload>
                            {getFieldDecorator('avatarPath', {
                                rules: [{ required: true, message: '请上传头像!' }],
                                initialValue: avatarPath,
                            })(
                                <Input className="hidden-input" />
                            )}
                        </Form.Item>
                        <Form.Item label="账号">
                            <div>{userInfo.email}</div>
                        </Form.Item>
                        <Form.Item label="昵称">
                            {getFieldDecorator('nickName', {
                                rules: [{ required: true, message: '请填写昵称!' }],
                                initialValue: userInfo.nickName,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="签名">
                            {getFieldDecorator('autograph', {
                                initialValue: userInfo.autograph,
                            })(
                                <TextArea style={{minHeight: '80px'}} />
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
                                确定
                            </Button>
                            <Button onClick={this.handleCancelModal} style={{marginLeft: '16px'}}>
                                返回
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
		)
	}
}

export default withRouter(Center)