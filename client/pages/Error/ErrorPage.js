import './index.less';
import React, { Component } from 'react';

class ErrorPage extends Component{
    render(){
        return (
            <div className={'error'}>
                <div className={'error-img'}></div>
                <div className={'error-back'}>
                    <span className={'error-tips'}>We are looking for your page... But We can't find it</span>
                    <span>
                        <a href="javascript:void(0)" onClick={()=>{this.props.history.goBack()}}>Go Back </a>
                        or
                        <a href="javascript:void(0)" onClick={()=>{this.props.history.push('/')}}> Go Home</a>
                    </span>
                </div>
            </div>
        )
    }
}

export default ErrorPage;