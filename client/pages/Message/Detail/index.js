import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Spin, Button, Icon } from 'antd';
import { getMessageMessage, putMessageMessage } from 'actions/message/';
import { getGivenSearch } from 'utils/location';

// import { markdown } from 'markdown';
@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		getMessageResult: state.getMessageResult,
		putMessageResult: state.putMessageResult
	})
)
class ArticleDetail extends Component{
	constructor(props){
		super(props);
		this.mditor = {};
		this.search = getGivenSearch(this.props,['contact_id']);
	}
	componentDidMount(){
		this.setMessage();
	}

	setMessage = () => {
		this.props.dispatch(getMessageMessage(this.search));
		this.props.dispatch(putMessageMessage({...this.search, saw: 'yes'}));
	}
	goBack = () => {
		this.props.history.goBack();
	}
	render(){
		const getMessageResult = this.props.getMessageResult;
		const message = getMessageResult.info.list && getMessageResult.info.list[0];
		return (
			<Spin spinning={getMessageResult.isLoading}>
				<div className={'message-header'}>消息管理 / 查看消息</div>
				<div className={'message-detail'}>
					<div className={'message-container'}>
						<Icon type="paper-clip" className={'message-clip'} />
						<div>{message && message.message}</div>
						<div className={'message-message'}>
						<Row>
							<Col span={4} className={'col-btn'}>
								<Row>
									<Col span={10} className={'col-key'} >消息ID：</Col>
									<Col span={14} className={'col-value'}>{message && message.contact_id}</Col>
								</Row>
							</Col>
							<Col span={7} className={'col-btn'}>
								<Row>
									<Col span={10} className={'col-key'} >联系者邮箱：</Col>
									<Col span={14} className={'col-value'}>{message && message.email}</Col>
								</Row>
							</Col>
							<Col span={7} className={'col-btn'}>
								<Row>
									<Col span={10} className={'col-key'} >联系者姓名：</Col>
									<Col span={14} className={'col-value'}>{message && message.name}</Col>
								</Row>
							</Col>
							<Col span={6} className={'col-btn'}>
								<Row>
									<Col span={10} className={'col-key'} >联系时间：</Col>
									<Col span={14} className={'col-value'}>{message && message.time}</Col>
								</Row>
							</Col>
						</Row>
					</div>
					</div>
				</div>
				<div className={'message-btn'}>
					<Button type="primary" onClick={this.goBack}>
						返回
					</Button>
				</div>
			</Spin>
		)
	}
}

export default withRouter(ArticleDetail)