import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { message } from 'antd';
import classNames from 'classnames';
import { updateNoteContent } from 'actions/note.js';

@connect(
    (state, props) => ({
        fetchNoteContentResult: state.fetchNoteContentResult,
        updateNoteContentResult: state.updateNoteContentResult,
        updateNoteStatusResult: state.updateNoteStatusResult,
        updateSelectedNoteResult: state.updateSelectedNoteResult,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    }),
    undefined,
    {withRef: true}
)
class MdEditor extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
        this.initFileContent(); // 当前文件在数据库中的内容
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchNoteContentResult, updateNoteContentResult, updateNoteStatusResult, updateSelectedNoteResult } = nextProps;
        if(fetchNoteContentResult && !fetchNoteContentResult.isLoading && !_.isEqual(fetchNoteContentResult, this.props.fetchNoteContentResult)){
            if(fetchNoteContentResult.info.data && fetchNoteContentResult.info.data[0]){
                this.mditor && (this.mditor.value = fetchNoteContentResult.info.data[0].content);
                this.fileContent = fetchNoteContentResult.info.data[0].content;
            }
        }
        if(updateNoteContentResult && !updateNoteContentResult.isLoading && !_.isEqual(updateNoteContentResult, this.props.updateNoteContentResult)){
            if(fetchNoteContentResult.info.data && fetchNoteContentResult.info.success){
                this.fileContent = this.mditor.value;
            }
        }
        if(updateNoteStatusResult && !updateNoteStatusResult.isLoading && !_.isEqual(updateNoteStatusResult, this.props.updateNoteStatusResult)){
            if(updateNoteStatusResult.status == 'edit'){
                setTimeout(() => {
                    this.mdTextarea && this.mdTextarea.focus();
                },500);
            }
        }
        
    }

    componentDidMount(){
        this.getMdAsyncResource();
    }

    componentWillUnmount(){
        window.clearInterval(this.timer);

        if(this.mdTextarea){
            this.mdTextarea.removeEventListener('focus', this.mdTextareaFocus);
            this.mdTextarea.removeEventListener('blur', this.mdTextareaBlur);
        }
    }

    initFileContent = () => {
        let { fetchNoteContentResult } = this.props;
        if(fetchNoteContentResult && fetchNoteContentResult.info && fetchNoteContentResult.info.data && fetchNoteContentResult.info.data[0]){
            this.fileContent = fetchNoteContentResult.info.data[0].content;
        }
    }

    saveContent = () => {
        if(this.mditor.value != this.fileContent){
            this.props.dispatch(updateNoteContent({
                id: this.props.fetchNoteContentResult.info.data[0].id,
                content: this.mditor.value
            }))
            return true;
        }
        return false;
    }

    mdTextareaFocus = () => {
        this.timer = window.setInterval(()=>{
            this.saveContent();
            
        }, 20000)
    }

    mdTextareaBlur = () => {
        window.clearInterval(this.timer);
        this.saveContent();
    }

    setMdMessage = () => {
		let result = this.props.fetchNoteContentResult;
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		// eslint-disable-next-line no-undef
        const mditor =  Mditor.fromTextarea(ele_textarea);
        mditor.value = result.info.data[0].content; // 由于首次渲染异步资源还未加载，加载完成再设置value
        this.mditor = mditor;

        window.mditor = mditor;

        this.mdTextarea = document.querySelector('.editor .textarea');
        this.mdTextarea.addEventListener('focus', this.mdTextareaFocus)
        this.mdTextarea.addEventListener('blur', this.mdTextareaBlur);
    }


    getMdAsyncResource = () => {
        // 按需加载mditor的js和css
        import(/* webpackChunkName: "mditor" */ 'plugins/mditor/css/mditor.min.css');
        import(/* webpackChunkName: "mditor" */ 'plugins/mditor/js/mditor.min.js').then(() => {
            this.setMdMessage();
        });
    }
    
	render(){
        const editorClass = classNames({
            'editor': true,
            'detail-editor': this.props.updateNoteStatusResult.status == 'detail',
            'edit-editor': this.props.updateNoteStatusResult.status == 'edit',
        })

        return (
            <div className={editorClass}>
                <textarea id="md_editor"></textarea>
            </div>
        )
	}
}

export default MdEditor;