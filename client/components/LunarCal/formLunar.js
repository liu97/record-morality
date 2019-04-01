import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import { message, Form, Button, Input, DatePicker, InputNumber, Calendar, Dropdown } from 'antd';
import CommonLunar from './common';
const PREFIX = 'form-lunar';

class FormLunar extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	UNSAFE_componentWillReceiveProps(nextProps){

    }

    getCommonLunar = () => {
        const props = this.props;
        return (
            <CommonLunar {...props}  onSelect={this.onSelect} />
        )
    }
	
	onSelect = (date) => {
		console.log(date);
    }

	render(){
		const props = this.props;
		const calClass = classNames({
            [props.className]: props.className != undefined,
			[PREFIX]: true,
		});
		return (
            <div className={calClass}>
                <Dropdown overlay={this.getCommonLunar} trigger={['click']}>
                    <Input></Input>
                </Dropdown>
            </div>
		)
	}
}

export default FormLunar