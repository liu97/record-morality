import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Icon } from 'antd';
import NavMenu from './Component/NavMenu';
import ContentList from './Component/ContentList';
import NoteContent from './Component/NoteContent';
import { NAVLIST } from 'constants/treeNav';
import { fetchNoteList } from 'actions/note.js';

const { Content, Sider } = Layout;
const PREFIX = 'note';

@connect(
    (state, props) => ({
        updateSelectedNoteResult: state.updateSelectedNoteResult,
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
        // let { fetchFolderTreeResult } = nextProps;

        // if(!_.isEqual(fetchFolderTreeResult, this.props.fetchFolderTreeResult) && !fetchFolderTreeResult.isLoading){
        //     this.addAsyncList(fetchFolderTreeResult);
        // }
    }

    onItemClick = (info) => {
        this.listRef && this.listRef.clearForm();
        this.getNoteList({folderId: info});
    }

    getNoteList = (query) => {
        let sendQuery = {}
        if(query){
            this.query = query;
            sendQuery = query;
        }
        else if(this.query){
            sendQuery = this.query;
        }
        else{
            this.query = sendQuery;
        }
        this.props.dispatch(fetchNoteList(sendQuery));
    }

	render(){
		return (
            <Layout className={PREFIX}>
                <Sider className={`${PREFIX}-sider`}>
                    <NavMenu 
                        className={`${PREFIX}-menu`}
                        navList={this.navList}
                        onTreeDrop={this.onTreeDrop}
                        onClick={this.onItemClick}
                        onTreeExpand={this.onTreeExpand}
                        onTreeRightClick={this.onTreeRightClick}
                    />
            
                </Sider>
                <div className={`${PREFIX}-container`}>
                    <ContentList  
                        className={`${PREFIX}-list`} 
                        wrappedComponentRef={(e) => this.listRef = e}
                        getNoteList={this.getNoteList}
                    />
                    <NoteContent 
                        className={`${PREFIX}-content`}
                        getNoteList={this.getNoteList}
                    >

                    </NoteContent>
                </div>
            </Layout>
		)
	}
}

export default Note