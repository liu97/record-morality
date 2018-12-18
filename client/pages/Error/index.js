import React from 'react';
import { Redirect } from 'react-router-dom';

const Error = () => {
    return <Redirect to={{ pathname: '/ErrorPage'}} />
}
export default Error;