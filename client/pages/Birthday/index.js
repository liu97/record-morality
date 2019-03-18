import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Layout, Icon, Breadcrumb } from 'antd';
import _ from 'lodash';
import NavMenu from './Component/NavMenu';

import { NAVLIST } from 'constants/birthdayNav';

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
class Birthday extends Component{
    constructor(props){
        super(props);
        this.navList = _.cloneDeep(NAVLIST);

        this.breadOption = {
            list: '查询列表',
            add: '添加提醒',
            detail: '查看提醒',
            update: '修改提醒',
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){

    }

    getActiveKey = (url = this.props.history.location.pathname) => {
        let result = url.replace(/\/$/, '').split('/').slice(-1);
		return result[0];
    }

	render(){
        const authed = getCookie('isLogin') == 'true';
        const activeKey = this.getActiveKey()
		return (
            <Layout className={PREFIX}>
                <Sider className={`${PREFIX}-sider`}>
                    <NavMenu 
                        className={`${PREFIX}-menu`}
                        navList={this.navList}
                    />
            
                </Sider>
                <div className={`${PREFIX}-container`}>
                    <div className={`${PREFIX}-container-breadcrumb`}>
                        <Breadcrumb>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>{activeKey}</Breadcrumb.Item>
                        </Breadcrumb>
                        <h2>{this.breadOption[activeKey]}</h2>
                    </div>
                    {renderRoutes(this.props.route.routes, authed, authPath, {wrappedComponentRef:(e) => this.listRef = e}
                    )}
                </div>
            </Layout>
		)
	}
}

export default withRouter(Birthday)