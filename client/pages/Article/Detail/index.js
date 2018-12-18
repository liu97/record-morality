import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Spin, Popover,Button } from 'antd';

import { fetchArticleMessage } from 'actions/article/';
import { getGivenSearch } from 'utils/location';
import { requestFront, getProxyURL } from 'utils/config';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		ArticleMessageResult: state.getArticleMessageResult
	})
)
class ArticleDetail extends Component{
	constructor(props){
		super(props);
		this.mditor = {};
		this.proxyURL = getProxyURL();
		this.search = getGivenSearch(this.props,['article_id']);
	}
	componentDidMount(){
		// 按需加载mditor的js和css
		import(/* webpackChunkName: "mditor" */ 'plugins/mditor/css/mditor.min.css');
		import(/* webpackChunkName: "mditor" */ 'plugins/mditor/js/mditor.min.js').then(() => {
			this.setMessage();
		})
	}
	UNSAFE_componentWillReceiveProps(newProps){
		let { ArticleMessageResult } = newProps;
		if(ArticleMessageResult !== this.props.ArticleMessageResult && ArticleMessageResult && ArticleMessageResult.isLoading === false) {
			this.mditor.value = ArticleMessageResult.info.list[0].article_content;
			this.mditor.height = '99%';
	    }
	}
	setMessage = () => {
		this.props.dispatch(fetchArticleMessage(this.search));
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		// eslint-disable-next-line no-undef
		const mditor =  Mditor.fromTextarea(ele_textarea);
		mditor.height = '600px';
		this.mditor = mditor;
	}
	goBack = () => {
		this.props.history.goBack();
	}
	render(){
		const ArticleMessageResult = this.props.ArticleMessageResult;
		const article = ArticleMessageResult.info.list && ArticleMessageResult.info.list[0];
		return (
			<Spin spinning={ArticleMessageResult.isLoading}>
				<div className={'article-detail'}>
					<div className={'article-header'}>文章管理 / 查看文章</div>
					<div className={'detail-editor'}>
						<textarea id="md_editor"></textarea>
					</div>
					<div className={'detail-message'}>
						<Row>
							<Col span={8} className={'col-key col'}>ID：</Col>
							<Col span={16} className={'col'}>{article && article.article_id}</Col>
						</Row>
						<Row>
							<Col span={8} className={'col-key col'}>标题：</Col>
							<Col span={16} className={'col'}>{article && article.title}</Col>
						</Row>
						<Row>
							<Col span={8} className={'col-key col'}>标签：</Col>
							<Col span={16} className={'col'}>{article && article.tags}</Col>
						</Row>
						<Row>
							<Col span={8} className={'col-key col'}>上传时间：</Col>
							<Col span={16} className={'col'}>{article && article.upload_time}</Col>
						</Row>
						<Row>
							<Col span={8} className={'col-key col'}>最后修改时间：</Col>
							<Col span={16} className={'col'}>{article && article.last_modify_time}</Col>
						</Row>
						<Row>
							<Col span={8} className={'col-key col'}>点赞数：</Col>
							<Col span={16} className={'col'}>{article && article.praise}</Col>
						</Row>
						<Row>
							<Col span={8} className={'col-key col'}>类型：</Col>
							<Col span={16} className={'col'}>{article && article.type}</Col>
						</Row>
						<Row>
							<Col span={8} className={'col-key col'}>封面：</Col>
							<Col span={16} className={'col'}>
								<Popover placement="left" content={<img className={'cover'} src={article && `${requestFront ? requestFront : ''}/${article.img_path}`}></img>}>
									<img className={'article-cover'} src={article && `${requestFront ? requestFront : ''}/${article.img_path}`}></img>
								</Popover>
							</Col>
						</Row>
						<Row>
							<Col span={6}></Col>
							<Col span={6} className={'col-btn'}>
								<Button type="primary">
									<Link to={`/admin/article/edit?article_id=${this.search.article_id}`}>编辑</Link>
								</Button>
							</Col>
							<Col span={6} className={'col-btn'}>
								<Button onClick={this.goBack}>
									返回
								</Button>
							</Col>
							<Col span={6}></Col>
						</Row>
					</div>
				</div>
			</Spin>
		)
	}
}

export default withRouter(ArticleDetail)