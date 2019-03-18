// import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Nav from 'containers/Nav';

import { updateSelectedKeys } from 'actions/note.js';

@connect(
    (state, props) => ({
        updateSelectedKeysResult: state.updateSelectedKeysResult,
    }),
    (dispatch) => ({
        actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch
    })
)
class NavMenu extends Nav{
    constructor(props){
        super(props);

        this.updateSelectedKeys = updateSelectedKeys;
    }
}

export default withRouter(NavMenu)