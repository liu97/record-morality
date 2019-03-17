// import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Icon } from 'antd';

import { NAVLIST } from 'constants/treeNav';
import { fetchNoteList, addNote, updateSelectedKeys } from 'actions/note.js';

import renderRoutes from 'utils/renderRoutes';
import { authPath } from 'utils/config';
import { getCookie } from 'utils/cookie';

const { Content, Sider } = Layout;
const PREFIX = 'birthday';

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
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        // let { fetchFolderTreeResult } = nextProps;

        // if(!_.isEqual(fetchFolderTreeResult, this.props.fetchFolderTreeResult) && !fetchFolderTreeResult.isLoading){
        //     if(!this.rootFolderId && fetchFolderTreeResult.info.data[0]){
        //         this.rootFolderId = fetchFolderTreeResult.info.data[0].id;
        //     }
        // }
    }

	render(){
        const authed = getCookie('isLogin') == 'true';
		return (
            <Layout className={PREFIX}>
                <Sider className={`${PREFIX}-sider`}>
                   
            
                </Sider>
                <div className={`${PREFIX}-container`}>
                    
                </div>
            </Layout>
		)
	}
}

export default Note