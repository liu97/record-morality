import './index.less';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArticleList, deleteArticleMessage } from 'actions/article';
import Table from 'containers/Table/Common';
import {COLUMNS, QUERY} from 'constants/article';
import { Button, Icon, Tooltip  } from 'antd';


@connect(
  // eslint-disable-next-line no-unused-vars
  (state, props) => ({
    reducerResult: state.reducerResult,
	listResult: state.getArticleResult,
	deleteResult: state.deleteArticleResult,
  })
)
class Article extends Table{
	constructor(props){
		super(props);
		this.columnsConfig = COLUMNS;
		this.queryConfig = QUERY;
		this.fetchList = fetchArticleList;
		this.hasReset = true;
		this.hasDownload = false;
		this.conPrefix = 'article-container';
		this.rowKey = 'article_id';
	}
	componentWillReceiveProps(newProps){
		let { deleteResult } = newProps;
		if(deleteResult !== this.props.deleteResult &&deleteResult && deleteResult.isLoading === false) {
			if(deleteResult.info.count != 0){
				this.triggerSubmit();
			}
	    }
	}
	deleteArticle = (article_id) =>{
		this.props.dispatch(deleteArticleMessage({article_id}));
	}
	addCustomCloumns() {
		COLUMNS.forEach((col) => {
			switch (col.key) {
			  	case 'opt': {
			    	// eslint-disable-next-line no-unused-vars
			    	col.render = (text, record, index) => {
			      	return (
			        	<div className="table-opt">
				            <Link to={`/admin/article/detail?article_id=${record.article_id}`} >查看 </Link>
				            <Link to={`/admin/article/edit?article_id=${record.article_id}`} >编辑 </Link>
				            <a href="javascript:void(0);" onClick={this.deleteArticle.bind(this,record.article_id)}>删除</a>
			        	</div>
			      	)}
			    	break;
			  	}
			}
		})
	}
	addButtonTool = () => {
		return (
			<div className={'add-article'}>
				<Tooltip title="点这添加新文章" placement="left">
					<Button type="primary" className={'add-btn'}>
						<Link to={'/admin/article/add'}><Icon type="file-add" theme="outlined" /> 报告，我有新文章要写</Link>
					</Button>
				</Tooltip>
			</div>
		)
	}
}

export default Article