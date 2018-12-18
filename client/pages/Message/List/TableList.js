import './index.less';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'containers/Table/Common';
import {COLUMNS, QUERY} from 'constants/message';
import { fetchMessageList, deleteMessageMessage } from 'actions/message/';


@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
        listResult: state.getMessageListResult,
        deleteMessageResult: state.deleteMessageResult
	})
)
class TableList extends Table{
	constructor(props){
		super(props);
		this.columnsConfig = COLUMNS;
		this.queryConfig = QUERY;
        this.fetchList = fetchMessageList;
        this.hideQuery = true;
        this.conPrefix = 'message-tablelist';
        this.rowKey = 'contact_id';
        this.additionQuery = {
            not: 'no',
            visited: 'yes'
        }
	}
	componentWillReceiveProps(newProps){
		let { deleteMessageResult } = newProps;
		if(deleteMessageResult !== this.props.deleteMessageResult &&deleteMessageResult && deleteMessageResult.isLoading === false) {
			if(deleteMessageResult.info.count != 0){
				this.triggerSubmit();
			}
	    }
	}
	deleteMessage = (contact_id) =>{
		this.props.dispatch(deleteMessageMessage({contact_id}));
	}
	addCustomCloumns() {
		COLUMNS.forEach((col) => {
			switch (col.key) {
				case 'message':
					// eslint-disable-next-line no-unused-vars
					col.render = (text, record, index) => {
						if(text.length > 100){
							return text.slice(0,100) + '...';
						}
						return text;
					}
					break;
			  	case 'opt': {
			    	// eslint-disable-next-line no-unused-vars
			    	col.render = (text, record, index) => {
			      	return (
			        	<div className="table-opt">
				            <Link to={`/admin/message/detail?contact_id=${record.contact_id}`} >查看 </Link>
				            <a href="javascript:void(0);" onClick={this.deleteMessage.bind(this,record.contact_id)}>删除</a>
			        	</div>
			      	)}
			    	break;
			  	}
			}
		})
    }
    filterParams = (query) =>{
        if(this.props.type == 'all'){
            return ;
        }
        else{
            query.saw = this.additionQuery[this.props.type];
        }
	}
}

export default TableList