import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import { format } from 'utils/time';
import { updateNoteContent } from 'actions/note.js';
import E from 'wangeditor';


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
class WangEditor extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
        this.initFileContent(); // 初始化文件在数据库中的内容
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchNoteContentResult, updateNoteContentResult, updateNoteStatusResult, updateSelectedNoteResult } = nextProps;
        if(fetchNoteContentResult && !fetchNoteContentResult.isLoading && !_.isEqual(fetchNoteContentResult, this.props.fetchNoteContentResult)){
            if(fetchNoteContentResult.info.data && fetchNoteContentResult.info.data[0]){
                this.wditor && (this.wditor.$textElem.html(fetchNoteContentResult.info.data[0].content));
                this.fileContent = fetchNoteContentResult.info.data[0].content;
            }
        }
        if(updateNoteContentResult && !updateNoteContentResult.isLoading && !_.isEqual(updateNoteContentResult, this.props.updateNoteContentResult)){
            if(fetchNoteContentResult.info.data && fetchNoteContentResult.info.success){
                this.fileContent = this.wditor.$textElem.html();
            }
        }
        
    }

    componentDidMount(){
        this.setTxtMessage();
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
        if(this.wditor.$textElem.html() != this.fileContent){
            this.props.dispatch(updateNoteContent({
                id: this.props.fetchNoteContentResult.info.data[0].id,
                content: this.wditor.$textElem.html()
            }));
            return true
        }
        return false;
    }

    txtDivFocus = () => {
        this.timer = window.setInterval(()=>{
            this.saveContent();
            
        }, 20000)
    }

    txtDivBlur = () => {
        window.clearInterval(this.timer);
        this.saveContent();
    }

    setTxtMessage = () => {
        const result = this.props.fetchNoteContentResult;
        const elem = this.refs.editorElem;
        const wditor = new E(elem);
        wditor.create();
        wditor.$textElem.html(result.info.data[0].content);
        
        this.wditor = wditor;

        wditor.$textElem[0].blur();
    }
    
	render(){
        const props = this.props;
        const contentClass = classNames({
            [props.className]: props.className != undefined
        })
		return (
            <div 
                ref='editorElem' 
                className={'wang-editor'} 
                onFocus={this.txtDivFocus} 
                onBlur={this.txtDivBlur}
            ></div>
		)
	}
}

export default WangEditor;