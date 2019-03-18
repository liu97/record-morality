import './index.less';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchBirthdayList } from 'actions/birthday';
import Table from 'containers/Table/Common';
import {COLUMNS, QUERY} from 'constants/birthday';
import { Button, Icon, Tooltip  } from 'antd';


@connect(
  // eslint-disable-next-line no-unused-vars
  (state, props) => ({
    fetchBirthdayListResult: state.fetchBirthdayListResult,
  })
)
class Article extends Table{
	constructor(props){
		super(props);
		this.columnsConfig = COLUMNS;
		this.queryConfig = QUERY;
		this.hasReset = true;
		this.hasDownload = false;
		this.conPrefix = 'birthday-list';
		this.fetchList = fetchBirthdayList;
		this.listResult = this.props.fetchBirthdayListResult;
	}
	componentWillReceiveProps(newProps){
		let { fetchBirthdayListResult } = newProps;
		if(fetchBirthdayListResult !== this.props.fetchBirthdayListResult &&fetchBirthdayListResult && fetchBirthdayListResult.isLoading === false) {
			if(fetchBirthdayListResult.info.count != 0){
				this.listResult = fetchBirthdayListResult
			}
	  }
	}
	deleteArticle = (article_id) =>{
		// this.props.dispatch(deleteArticleMessage({article_id}));
	}
	addCustomCloumns() {
		COLUMNS.forEach((col) => {
			switch (col.key) {
				case 'date':
				case 'createdAt':
				case 'updatedAt':
					// eslint-disable-next-line no-unused-vars
			    	col.render = (text, record, index) => {
						return (
						  <span>{moment(text).format('YYYY-MM-DD')}</span>
						)}
					break;
				case 'dateType':
					// eslint-disable-next-line no-unused-vars
			    	col.render = (text, record, index) => {
						return (
						  <span>{text ? '阳历' : '阴历'}</span>
						)}
					break;
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
}

export default Article