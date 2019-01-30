import './index.less';
import React, { Component } from 'react';
import { Icon, Form, Input, Button, DatePicker, Tooltip, Spin, Empty } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import { format } from 'utils/time';

const { RangePicker } = DatePicker;

@connect(
    (state, props) => ({
        fetchNoteContentResult: state.fetchNoteContentResult,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    })
)
@Form.create()
class ContentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedNote: undefined
        }
		
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchNoteListResult } = nextProps;
        if(fetchNoteListResult && !_.isEqual(fetchNoteListResult, this.props.fetchNoteListResult)){
            
        }
    }

    componentDidMount(){
        
    }

    getMd = () => {
        return (
            <div>{'md'}</div>
        )
    }

    getTxt = () => {
        return (
            <div>{'txt'}</div>
        )
    }

    getContent = () => {
        let result = this.props.fetchNoteContentResult;

        return (
            <React.Fragment>
                <div className={'content-header'}></div>
                <div className={'content-data'}>
                    {
                        result.data[0].noteType == 'md' ? this.getMd() : this.getTxt()
                    }
                </div>
            </React.Fragment>
        )
    }
    
	render(){
        const props = this.props;
        let result = props.fetchNoteContentResult;
        const contentListClass = classNames({
            [props.className]: props.className != undefined,
            'content-container': true
        })
		return (
            <div
                className={contentListClass}
            >
                <Spin spinning={result.isLoading}>
                    {
                        result.data.length ? this.getContent() : <Empty></Empty>
                    }
                </Spin>
                
            </div>
		)
	}
}

export default ContentList;