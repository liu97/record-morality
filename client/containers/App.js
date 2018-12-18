import '../style/reset.css';
import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { renderRoutes } from 'react-router-config';
import renderRoutes from 'utils/renderRoutes';
import { authPath } from 'utils/config';
import { getCookie } from 'utils/cookie';
import Header from 'containers/Header';
import Left from 'containers/Left';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		getLoginStatus: state.getLoginStatus
	})
)
class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const authed = getCookie('isLogin') == 'true';
    return (
      <div className="app">
        <Header />
        <Left />
        <div className="right">
          {renderRoutes(this.props.route.routes, authed, authPath)}
        </div>
      </div>
    )
  }
}

export default App