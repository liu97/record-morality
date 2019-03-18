import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Icon } from 'antd';
import _ from 'lodash';
import NavMenu from './Component/NavMenu';

import { NAVLIST } from 'constants/treeNav';
import { fetchNoteList, addNote, updateSelectedKeys } from 'actions/note.js';

import renderRoutes from 'utils/renderRoutes';
import { authPath } from 'utils/config';
import { getCookie } from 'utils/cookie';

const { Content, Sider } = Layout;
const PREFIX = 'note';

@connect(
    (state, props) => ({
        updateSelectedKeysResult: state.updateSelectedKeysResult,
        fetchFolderTreeResult: state.fetchFolderTreeResult,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    })
)
class Note extends Component{
    constructor(props){
        super(props);
        this.navList = _.cloneDeep(NAVLIST);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        let { fetchFolderTreeResult } = nextProps;

        if(!_.isEqual(fetchFolderTreeResult, this.props.fetchFolderTreeResult) && !fetchFolderTreeResult.isLoading){
            if(!this.rootFolderId && fetchFolderTreeResult.info.data[0]){
                this.rootFolderId = fetchFolderTreeResult.info.data[0].id;
            }
        }
    }

    onItemClick = (info) => { // 提到这里是为了处理查询form
        this.listRef && this.listRef.clearForm();
        let query = {};
        switch (info){
            case 'recent':
                break;
            case 'trendMap':
                return;
            default:
                query = {folderId: info};
                break;
        }

        this.getNoteList(query);
    }

    handleAddNote = (title, noteType = 'txt', content = '') => { // 提到这里是为了让NavMenu和ContentList共用
        let folderKey = this.props.updateSelectedKeysResult.keys[0];
        if(!Number(folderKey)){
            folderKey = String(this.rootFolderId);
            this.props.history.push(`/admin/note/folder/${folderKey}`)
            this.props.dispatch(updateSelectedKeys({keys:[folderKey]}));
        }
        this.props.dispatch(addNote({folderId:folderKey, title, noteType, content}))
    }

    getNoteList = (query) => {
        let sendQuery = {}
        if(query){
            sendQuery = query;
        }
        else if(this.query){
            sendQuery = this.query;
        }
        this.query = sendQuery;
        this.props.dispatch(fetchNoteList(sendQuery));
    }

	render(){
        const authed = getCookie('isLogin') == 'true';
		return (
            <Layout className={PREFIX}>
                <Sider className={`${PREFIX}-sider`}>
                    <NavMenu 
                        className={`${PREFIX}-menu`}
                        navList={this.navList}
                        onClick={this.onItemClick}
                        handleAddNote={this.handleAddNote}
                    />
            
                </Sider>
                <div className={`${PREFIX}-container`}>
                    {renderRoutes(this.props.route.routes, authed, authPath, 
                                    {wrappedComponentRef:(e) => this.listRef = e,
                                    getNoteList:this.getNoteList,
                                    handleAddNote:this.handleAddNote}
                    )}
                </div>
            </Layout>
		)
	}
}

export default Note