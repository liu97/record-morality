import './index.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Icon } from 'antd';
import NavMenu from './Component/NavMenu';
import ContentList from './Component/ContentList';
import { NAVLIST } from 'constants/treeNav';

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
        console.log(info);
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
                <Layout>
                    <Content>
                        <ContentList  className={`${PREFIX}-list`}/>
                    </Content>
                </Layout>
            </Layout>
		)
	}
}

export default Note