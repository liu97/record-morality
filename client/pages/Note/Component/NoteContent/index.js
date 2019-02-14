import './index.less';
import React, { Component } from 'react';
import { Icon, Form, Input, Button, DatePicker, Tooltip, Spin, Empty, message, Drawer } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import { format } from 'utils/time';
import { updateNoteContent, fetchNoteContent, updateNoteStatus } from 'actions/note.js';

const { RangePicker } = DatePicker;

@connect(
    (state, props) => ({
        fetchNoteContentResult: state.fetchNoteContentResult,
        updateNoteContentResult: state.updateNoteContentResult,
        updateNoteStatusResult: state.updateNoteStatusResult,
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
            noteTitle: '',
            drawerVisible: false,
        }
		this.asyncFlag = true;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchNoteContentResult, updateNoteContentResult, updateNoteStatusResult } = nextProps;
        if(fetchNoteContentResult && !fetchNoteContentResult.isLoading && !_.isEqual(fetchNoteContentResult, this.props.fetchNoteContentResult)){
            if(fetchNoteContentResult.info.data && fetchNoteContentResult.info.data[0] && fetchNoteContentResult.info.data[0].title != this.state.noteTitle){
                this.setState({
                    noteTitle: fetchNoteContentResult.info.data[0].title
                });
                this.realTitle = fetchNoteContentResult.info.data[0].title;

                updateNoteStatusResult.status != 'datail' && this.props.dispatch(updateNoteStatus({status: 'detail'}))

                this.mditor && (this.mditor.value = fetchNoteContentResult.info.data[0].content);
            }
        }
        if(updateNoteContentResult && !updateNoteContentResult.isLoading && !_.isEqual(updateNoteContentResult, this.props.updateNoteContentResult)){
            if(!updateNoteContentResult.info.success){
                this.realTitle && this.setState({
                    noteTitle: this.realTitle
                })
            }
            else{
                if(this.state.noteTitle != this.realTitle){ // 修改了文档标题
                    this.realTitle = this.state.noteTitle
                    this.props.getNoteList()
                }
                else{ // 修改了文档内容
                    this.props.dispatch(updateNoteStatus({status: 'detail'}));
                    message.success('保存成功');
                }
            }
        }
    }

    componentDidMount(){
        
    }

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };
    
    hiddenDrawer = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    setMdMessage = () => {
		let result = this.props.fetchNoteContentResult;
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		// eslint-disable-next-line no-undef
        const mditor =  Mditor.fromTextarea(ele_textarea);

        mditor.value = result.info.data[0].content; // 由于首次渲染异步资源还未加载，加载完成再设置value

        this.mditor = mditor;

    }
    
    getAsyncResource = () => {
        if(this.asyncFlag){
            // 按需加载mditor的js和css
            import(/* webpackChunkName: "mditor" */ 'plugins/mditor/css/mditor.min.css');
            import(/* webpackChunkName: "mditor" */ 'plugins/mditor/js/mditor.min.js').then(() => {
                this.setMdMessage();
            });
            this.asyncFlag = false;
        }
    }

    getMd = () => {
        this.getAsyncResource();
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

    getTxt = () => {
        this.asyncFlag = true;

        return (
            <div>{'txt'}</div>
        )
    }

    titleChange = (event) => {
        this.setState({
            noteTitle: event.target.value 
        })
    }

    submitTitle = (event) => {
        let result = this.props.fetchNoteContentResult;
        if(this.realTitle != event.target.value){
            let query = {
                id: result.info.data[0].id,
                title: event.target.value,
            }
            this.props.dispatch(updateNoteContent(query));
        }
    }

    handleBtnClick = (isEdit, event) => {
        if(isEdit){
            this.props.dispatch(updateNoteStatus({status: 'edit'}))
        }
        else{
            let note = this.props.fetchNoteContentResult.info.data[0];
            if(this.mditor.value != note.content){
                this.props.dispatch(updateNoteContent({id: note.id, content: this.mditor.value}))
            }
            else{
                this.props.dispatch(updateNoteStatus({status: 'detail'}));
                message.success('保存成功');
            }
        }
    }

    getContent = () => {
        let result = this.props.fetchNoteContentResult;
        const isEdit = result.info.data[0].noteType == 'md' && this.props.updateNoteStatusResult.status == 'detail';

        return (
            <React.Fragment>
                <div className={'content-header'}>
                        <input
                            className={'content-title'}
                            value={this.state.noteTitle}
                            onChange={this.titleChange}
                            onBlur={this.submitTitle}
                        ></input>
                        <Button 
                            type="primary" 
                            ghost 
                            className={'content-button'}
                            onClick={(event)=>this.handleBtnClick(isEdit, event)}
                        >
                            {
                                isEdit ? '编辑' : '保存'
                            }
                        </Button>
                        <Tooltip placement="bottom" title={'文件信息'}>
                            <Icon 
                                type="info-circle" 
                                style={{color: '#1890ff'}} 
                                className={'content-info'}
                                onClick={this.showDrawer}
                            />
                        </Tooltip>
                </div>
                <div className={'content-data'}>
                    {
                        result.info.data[0].noteType == 'md' ? this.getMd() : this.getTxt()
                    }
                </div>
            </React.Fragment>
        )
    }

    getEmpty = () => {
        this.asyncFlag = true;

        return (
            <Empty></Empty>
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
                        result.info.data && result.info.data.length ? this.getContent() : this.getEmpty()
                    }
                    <Drawer
                        title="文件信息"
                        placement="right"
                        closable={false}
                        onClose={this.hiddenDrawer}
                        visible={this.state.drawerVisible}
                    >

                    </Drawer>
                </Spin>
                
            </div>
		)
	}
}

export default ContentList;