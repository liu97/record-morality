import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';


// import { renderRoutes } from 'react-router-config';
import renderRoutes from 'utils/renderRoutes';
import { authPath } from 'utils/config';
import { getCookie } from 'utils/cookie';
import Header from 'containers/Header';

const PREFIX = 'app';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
	})
)
class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const authed = getCookie('isLogin') == 'true';
    return (
      <Layout className={`${PREFIX}`}>
        <Header />
        {renderRoutes(this.props.route.routes, authed, authPath)}
      </Layout>
    )
  }
}

export default App