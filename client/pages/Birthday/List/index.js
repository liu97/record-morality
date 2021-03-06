import './index.less';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchBirthdayList } from 'actions/birthday';
import Table from 'containers/Table/Common';
import {COLUMNS, QUERY} from 'constants/birthday';
import { Button, Icon  } from 'antd';
import { deleteBirthday } from 'actions/birthday';
import chineseLunar from 'chinese-lunar';

@connect(
  // eslint-disable-next-line no-unused-vars
  (state, props) => ({
    fetchBirthdayListResult: state.fetchBirthdayListResult,
    deleteBirthdayResult: state.deleteBirthdayResult,
  })
)
class Birthday extends Table{
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

	componentWillReceiveProps(nextProps){
		let { fetchBirthdayListResult, deleteBirthdayResult } = nextProps;
		if(fetchBirthdayListResult !== this.props.fetchBirthdayListResult &&fetchBirthdayListResult && fetchBirthdayListResult.isLoading === false) {
			this.listResult = fetchBirthdayListResult
		}
		if(deleteBirthdayResult !== this.props.deleteBirthdayResult &&deleteBirthdayResult && deleteBirthdayResult.isLoading === false) {
				this.triggerSubmit();
	  }
	}

	handleDeleteBirthday = (id) =>{
		this.props.dispatch(deleteBirthday({id}));
	}

	addCustomCloumns() {
		COLUMNS.forEach((col) => {
			switch (col.key) {
				case 'date':
					// eslint-disable-next-line no-unused-vars
					col.render = (text, record, index) => {
						if(record.dateType == '2'){
							let lunarDate = chineseLunar.solarToLunar(new Date(moment(text).format('YYYY-MM-DD 00:00:00')));
							text = chineseLunar.format(lunarDate, 'T(A)Md');
						}
						else{
							text = moment(text).format('YYYY-MM-DD');
						}
						return (
							<span>{text}</span>
						)}
					break;
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
							<span>{text == '1' ? '阳历' : '阴历'}</span>
						)}
					break;
			  	case 'opt': {
			    	// eslint-disable-next-line no-unused-vars
			    	col.render = (text, record, index) => {
			      	return (
			        	<div className="table-opt">
				            <Link to={`/admin/birthday/detail?id=${record.id}`} >查看 </Link>
				            <Link to={`/admin/birthday/edit?id=${record.id}`} >编辑 </Link>
				            <a href="javascript:void(0);" onClick={this.handleDeleteBirthday.bind(this,record.id)}>删除</a>
			        	</div>
			      	)}
			    	break;
			  	}
			}
		})
	}
	
	addButtonTool = () => {
		return (
			<div className={'add-birthday'}>
				<Button type="primary" className={'add-btn'}>
					<Link to={'/admin/birthday/add'}><Icon type="file-add" theme="outlined" /> 添加提醒</Link>
				</Button>
			</div>
		)
	}
}

export default Birthday