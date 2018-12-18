import React, { Component } from 'react'
import routes from 'routes';
import renderRoutes from 'utils/renderRoutes';
import { authPath } from 'utils/config';
import { getCookie } from 'utils/cookie';

class ConfirmLogin extends Component{
    render(){
        const authed = getCookie('isLogin') == 'true';
        return(
            <React.Fragment>
                {renderRoutes(routes, authed, authPath) }
            </React.Fragment>
        )
    }
}

export default ConfirmLogin;