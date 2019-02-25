import './index.less';
import React, { Component } from 'react';
import { Icon, Form, Input, Button, DatePicker, Tooltip, Spin, Empty, message, Drawer, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import { format } from 'utils/time';
import { updateNoteContent, fetchNoteContent, updateNoteStatus } from 'actions/note.js';
import WangEditor from '../WangEditor';
import MdEditor from '../MdEditor';


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
class NoteContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            noteTitle: '',
            drawerVisible: false,
        }
        this.realTitle = ''; // 当前文件在数据库中的标题
        this.handleSave = false; // 手动保存文件

        this.mdRef = React.createRef();
        this.txtRef = React.createRef();
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
            if(updateNoteStatusResult.status == 'edit'){
                setTimeout(() => {
                    this.mdTextarea && this.mdTextarea.focus();
                },500);
            }
        }
        if(updateSelectedNoteResult && !updateSelectedNoteResult.isLoading && !_.isEqual(updateSelectedNoteResult, this.props.updateSelectedNoteResult)){
            this.props.dispatch(fetchNoteContent(updateSelectedNoteResult));
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
    
    titleChange = (event) => {
        this.setState({
            noteTitle: event.target.value 
        })
    }

    submitTitle = (event) => {
        let result = this.props.fetchNoteContentResult;
        if(event.target.value == ''){
            this.setState({
                noteTitle: this.realTitle
            })
        }
        else if(this.realTitle != event.target.value){
            let query = {
                id: result.info.data[0].id,
                title: event.target.value,
            }
            this.props.dispatch(updateNoteContent(query));
        }
    }

    handleBtnClick = (isEditBtn, event) => {
        if(isEditBtn){
            this.props.dispatch(updateNoteStatus({status: 'edit'}));
        }
        else{
            let result = this.props.fetchNoteContentResult;
            let change;
            if(result.info.data[0].noteType == 'md'){
                change = this.mdRef.current.wrappedInstance.saveContent();
            }
            else{
                change = this.txtRef.current.wrappedInstance.saveContent();
            }

            if(!change){
                this.props.dispatch(updateNoteStatus({status: 'detail'}));
                message.success('保存成功');
            }
            this.handleSave = true;
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
                        result.info.data[0].noteType == 'md' ? <MdEditor ref={this.mdRef} /> : <WangEditor ref={this.txtRef} />
                    }
                </div>
            </React.Fragment>
        )
    }

    getEmpty = () => {
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
                    {
                        result.info.data && result.info.data.length != 0 &&
                        <Drawer
                            title="文件信息"
                            placement="right"
                            closable={false}
                            onClose={this.hiddenDrawer}
                            visible={this.state.drawerVisible}
                            className={'content-drawer'}
                        >
                            <Row gutter={8}>
                                <Col className="gutter-row1" span={8}>
                                    {"创建时间:"}
                                </Col>
                                <Col className="gutter-row2" span={16}>
                                    {
                                        format(result.info.data[0].createdAt)
                                    }
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col className="gutter-row1" span={8}>
                                    {"更新时间:"}
                                </Col>
                                <Col className="gutter-row2" span={16}>
                                    {
                                        format(result.info.data[0].updatedAt)
                                    }
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col className="gutter-row1" span={8}>
                                    {"文件路径:"}
                                </Col>
                                <Col className="gutter-row2" span={16}>
                                    <span title={result.info.data[0].noteFrom}>
                                        {
                                            result.info.data[0].noteFrom
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Drawer>
                    }
                </Spin>
                
            </div>
		)
	}
}

export default NoteContent;