import './index.less';
import React, { Component } from 'react';
import { Icon, Form, Input, Button, DatePicker, Tooltip, Spin, Empty, message, Drawer, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import { format } from 'utils/time';
import { updateNoteContent, fetchNoteContent, updateNoteStatus } from 'actions/note.js';

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
        this.asyncFlag = true; // 是否加载md异步文件
        this.fileContent = ''; // 当前文件在数据库中的内容
        this.realTitle = ''; // 当前文件在数据库中的标题
        this.handleSave = false; // 手动保存文件
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { fetchNoteContentResult, updateNoteContentResult, updateNoteStatusResult, updateSelectedNoteResult } = nextProps;
        if(fetchNoteContentResult && !fetchNoteContentResult.isLoading && !_.isEqual(fetchNoteContentResult, this.props.fetchNoteContentResult)){
            if(fetchNoteContentResult.info.data && fetchNoteContentResult.info.data[0]){
                if(fetchNoteContentResult.info.data[0].title != this.state.noteTitle){
                    this.setState({
                        noteTitle: fetchNoteContentResult.info.data[0].title
                    });
                    this.realTitle = fetchNoteContentResult.info.data[0].title;
                }
                this.mditor && (this.mditor.value = fetchNoteContentResult.info.data[0].content);

                this.fileContent = fetchNoteContentResult.info.data[0].content;
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
                else {
                    if(this.handleSave){ // 手动修改了文档内容
                        this.props.dispatch(updateNoteStatus({status: 'detail'}));
                        this.handleSave = false;
                        message.success('保存成功');
                    }
                }
                
            }
        }
        if(updateNoteStatusResult && !updateNoteStatusResult.isLoading && !_.isEqual(updateNoteStatusResult, this.props.updateNoteStatusResult)){

        }
        if(updateSelectedNoteResult && !updateSelectedNoteResult.isLoading && !_.isEqual(updateSelectedNoteResult, this.props.updateSelectedNoteResult)){
            this.props.dispatch(fetchNoteContent(updateSelectedNoteResult));
        }
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        window.clearInterval(this.timer);

        this.mdTextarea.removeEventListener('focus', this.mdTextareaFocus);
        this.mdTextarea.removeEventListener('blur', this.mdTextareaBlur);
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

    saveContent = () => {
        if(this.mditor.value != this.fileContent){
            this.props.dispatch(updateNoteContent({
                id: this.props.fetchNoteContentResult.info.data[0].id,
                content: this.mditor.value
            }))
            this.fileContent = this.mditor.value;
        }
    }

    mdTextareaFocus = () => {
        this.timer = window.setInterval(()=>{
            this.saveContent();
            
        }, 20000)
    }

    mdTextareaBlur = () => {
        this.saveContent();
        window.clearInterval(this.timer);
    }
    

    setMdMessage = () => {
		let result = this.props.fetchNoteContentResult;
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		// eslint-disable-next-line no-undef
        const mditor =  Mditor.fromTextarea(ele_textarea);
        mditor.value = result.info.data[0].content; // 由于首次渲染异步资源还未加载，加载完成再设置value
        this.mditor = mditor;

        this.mdTextarea = document.querySelector('.editor .textarea');
        this.mdTextarea.addEventListener('focus', this.mdTextareaFocus)
        this.mdTextarea.addEventListener('blur', this.mdTextareaBlur);
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
                <textarea id="md_editor" className={'hh'}></textarea>
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

    handleBtnClick = (isEditBtn, event) => {
        const note = this.props.fetchNoteContentResult.info.data[0];
        if(isEditBtn){
            this.props.dispatch(updateNoteStatus({status: 'edit'}))
        }
        else{
            if(this.mditor.value != this.fileContent){
                this.fileContent = this.mditor.value;
                this.props.dispatch(updateNoteContent({id: note.id, content: this.mditor.value}))

                this.handleSave = true;
            }
            else{
                this.props.dispatch(updateNoteStatus({status: 'detail'}));
                message.success('保存成功');
            }
        }
    }

    getContent = () => {
        let result = this.props.fetchNoteContentResult;
        const isEditBtn = result.info.data[0].noteType == 'md' && this.props.updateNoteStatusResult.status == 'detail';

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
                            onClick={(event)=>this.handleBtnClick(isEditBtn, event)}
                        >
                            {
                                isEditBtn ? '编辑' : '保存'
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
                        <Row gutter={8}>
                            <Col className="gutter-row" span={8}>
                                {"创建时间:"}
                            </Col>
                            <Col className="gutter-row" span={16}>
                                {
                                    result.info.data && 
                                    result.info.data[0] &&
                                    format(result.info.data[0].createdAt)
                                }
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col className="gutter-row" span={8}>
                                {"更新时间:"}
                            </Col>
                            <Col className="gutter-row" span={16}>
                                {
                                    result.info.data && 
                                    result.info.data[0] &&
                                    format(result.info.data[0].updatedAt)
                                }
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col className="gutter-row" span={8}>
                                {"文件路径:"}
                            </Col>
                            <Col className="gutter-row" span={16}>
                                {
                                    result.info.data && 
                                    result.info.data[0] &&
                                    result.info.data[0].noteFrom
                                }
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col className="gutter-row" span={8}>
                                {"文件夹:"}
                            </Col>
                            <Col className="gutter-row" span={16}>
                                {
                                    result.info.data && 
                                    result.info.data[0] &&
                                    result.info.data[0].noteFrom
                                }
                            </Col>
                        </Row>
                    </Drawer>
                </Spin>
                
            </div>
		)
	}
}

export default ContentList;