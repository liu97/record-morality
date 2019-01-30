import './index.less';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, DatePicker, Tooltip, Spin, Empty } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import classNames from 'classnames';
import { fetchNoteList, fetchNoteContent } from 'actions/note.js';
import { format } from 'utils/time';

const { RangePicker } = DatePicker;

@connect(
    (state, props) => ({
        fetchNoteListResult: state.fetchNoteListResult,
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
            if(fetchNoteListResult.data.length){
                this.setSelectedNote(fetchNoteListResult.data[0].id);
            }
            else{
                this.setSelectedNote(null);
            }
        }
    }

    componentDidMount(){
        
    }

    handleSubmit = (e) => { // 提交表单
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {

                const rangeValue = fieldsValue['createdAt'];
                const values = {
                    ...fieldsValue,
                    'createdAt': rangeValue && rangeValue.length && [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
                }

                for(let key of Object.keys(values)){
                    if(values[key] == undefined || values[key] == ''){
                        delete values[key]
                    }
                }
                
                
                this.props.dispatch(fetchNoteList(values))
            }
        });
    }

    clearForm = () => { // 清楚表单
        this.props.form.resetFields();
    }

    setSelectedNote = (id) => { // 点击笔记列表
        if(id != this.state.selectedNote){
            this.setState({
                selectedNote: id
            });

            this.props.dispatch(fetchNoteContent({id}));
        }
    }

    getForm = () => {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="search-form">
                <Form.Item>
                    {getFieldDecorator('fuzzy_title')(
                        <Input placeholder="根据文件名搜索" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('createdAt')(
                        <RangePicker/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Tooltip placement="right" title="检索范围为全部">
                        <Button type="primary" htmlType="submit" className="search-button">
                            查询
                        </Button>
                    </Tooltip>
                </Form.Item>
            </Form>
        )
    }

    getList = () => {
        const result = this.props.fetchNoteListResult;

        return(
            <Spin spinning={result.isLoading}>
                {
                    result.data && result.data.length ? 
                    <ul className={'search-list'}>
                        {
                            
                            result.data.map((item, index) => {
                                let listClassName = classNames({
                                    'search-li-selected': this.state.selectedNote == item.id,
                                    'search-li': true
                                });
                                return (
                                    <li 
                                        key={item.id}
                                        className={listClassName}
                                        onClick={this.setSelectedNote.bind(this, item.id)}
                                    >

                                        <span className={'search-li-title'}>
                                            {
                                                item.noteType == 'md' ? <Icon type="file-markdown" /> : <Icon type="file-text" />
                                            }
                                            {`${item.title}.${item.noteType}`}
                                        </span>
                                        <span className={'search-li-time'}>{format(item.createdAt)}</span>
                                    </li>
                                )
                            })

                        }
                    </ul> :
                    <div className={'list-no-data'}>
                        <Empty
                            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                            description={
                                <span>
                                    未找到文件
                                </span>
                            }
                        >
                            <Button type="primary">新建笔记</Button>
                        </Empty>
                    </div>
                }
            </Spin>
        )
    }

	render(){
        const props = this.props;
        const contentListClass = classNames({
            [props.className]: props.className != undefined,
            'content-list': true
        })
		return (
            <div
                className={contentListClass}
            >
                {this.getForm()}
                {this.getList()}
            </div>
		)
	}
}

export default ContentList;