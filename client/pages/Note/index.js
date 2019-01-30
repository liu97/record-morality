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

    onItemClick = (info, e) => {
        this.listRef && this.listRef.clearForm();
        let folderId = info.split('/').slice(-1).join();
        this.props.dispatch(fetchNoteList({folderId}));
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
                    <ContentList  className={`${PREFIX}-list`} wrappedComponentRef={(e) => this.listRef = e}/>
                    <NoteContent className={`${PREFIX}-content`}>

                    </NoteContent>
                </div>
            </Layout>
		)
	}
}

export default Note