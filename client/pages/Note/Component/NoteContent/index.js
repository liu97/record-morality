import './index.less';
import React, { Component } from 'react';
import { Icon, Form, Input, Button, DatePicker, Tooltip, Spin, Empty } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import { format } from 'utils/time';
import { updateNoteContent, fetchNoteContent } from 'actions/note.js';

const { RangePicker } = DatePicker;

@connect(
    (state, props) => ({
        fetchNoteContentResult: state.fetchNoteContentResult,
        updateNoteContentResult: state.updateNoteContentResult,
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
            noteStatus: 'detail',
            noteTitle: '',
        }
		
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchNoteContentResult, updateNoteContentResult } = nextProps;
        if(fetchNoteContentResult && !_.isEqual(fetchNoteContentResult, this.props.fetchNoteContentResult)){
            
        }
        if(updateNoteContentResult && !_.isEqual(updateNoteContentResult, this.props.updateNoteContentResult)){
            let result = this.props.fetchNoteContentResult;
            let query = {
                id: result.data[0].id,
            }
            this.props.dispatch(fetchNoteContent(query))
        }
    }

    componentDidMount(){
        
    }

    setMdMessage = () => {
		let result = this.props.fetchNoteContentResult;
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		// eslint-disable-next-line no-undef
        const mditor =  Mditor.fromTextarea(ele_textarea);
        mditor.value = result.data[0].content;
		mditor.height = '600px';
	}

    getMd = () => {
        // 按需加载mditor的js和css
        import(/* webpackChunkName: "mditor" */ 'plugins/mditor/css/mditor.min.css');
        import(/* webpackChunkName: "mditor" */ 'plugins/mditor/js/mditor.min.js').then(() => {
            this.setMdMessage();
        })

        const editorClass = classNames({
            'editor': true,
            'detail-editor': this.state.noteStatus == 'detail',
            'edit-editor': this.state.noteStatus == 'edit',
        })

        return (
            <div className={editorClass}>
                <textarea id="md_editor"></textarea>
            </div>
        )
    }

    getTxt = () => {
        return (
            <div>{'txt'}</div>
        )
    }

    titleChange = (event) => {
        let result = this.props.fetchNoteContentResult;
        let query = {
            id: result.data[0].id,
            title: event.target.value,
        }
        this.props.dispatch(updateNoteContent(query))
    }

    getContent = () => {
        let result = this.props.fetchNoteContentResult;

        return (
            <React.Fragment>
                <div className={'content-header'}>
                    <div className={'content-title'}>
                        <input
                            value={result.data[0].title}
                            onBlur={this.titleChange}
                        ></input>
                    </div>
                </div>
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
        const contentClass = classNames({
            [props.className]: props.className != undefined,
            'content-container': true
        })
		return (
            <div
                className={contentClass}
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