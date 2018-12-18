import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';

import ArticleForm from 'components/ArticleForm';
import { postArticleMessage } from 'actions/article/';
import { getProxyURL } from 'utils/config';
@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		postArticleResult: state.postArticleResult
	})
)
class ArticleAdd extends Component{
	constructor(props){
		super(props);
		this.mditor = {};
		this.proxyURL = getProxyURL();

	}
	componentDidMount(){
		// 按需加载mditor的js和css
		import(/* webpackChunkName: "mditor" */ 'plugins/mditor/css/mditor.min.css');
		import(/* webpackChunkName: "mditor" */ 'plugins/mditor/js/mditor.min.js').then(() => {
			this.setMessage();
		})
	}
	UNSAFE_componentWillReceiveProps(newProps){
		let { postArticleResult } = newProps;
		const props = this.props;
		if(postArticleResult !== this.props.postArticleResult && postArticleResult && postArticleResult.isLoading === false){
			if(postArticleResult.info.count != 0){
				message.info('提交成功',0.5);
				setTimeout(function(){
					props.history.push('/admin/article/list');
				},600);
			}
		}
	}
	// 设置markdown内容
	setMessage = () =>{
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		// eslint-disable-next-line no-undef
		const mditor =  Mditor.fromTextarea(ele_textarea);
		mditor.height='99%'
		this.mditor = mditor;
	}
	// 提交表单
	handleSubmit = (values) => {
		values.text = this.mditor.value;
		this.props.dispatch(postArticleMessage(values));
	}

	render(){
		return (
			<div className={'article-add'}>
				<div className={'article-header'}>文章管理 / 新增文章</div>
				<div className={'add-editor'}>
					<textarea id="md_editor"></textarea>
				</div>
				<div className={'add-message'}>
					<ArticleForm handleSubmit={this.handleSubmit}></ArticleForm>
				</div>
			</div>
		)
	}
}

export default withRouter(ArticleAdd)