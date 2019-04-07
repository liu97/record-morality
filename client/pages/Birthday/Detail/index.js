import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { message, Card, Row, Col, Button } from 'antd';
import { getGivenSearch } from 'utils/location';
import moment from 'moment';
import chineseLunar from 'chinese-lunar';

import { fetchBirthdayList } from 'actions/birthday';
const PREFIX = 'birthday-detail';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		fetchBirthdayListResult: state.fetchBirthdayListResult,
	})
)
class BirthdayAdd extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
        this.props.dispatch(fetchBirthdayList(this.search));
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		
    }
    
    goBack = () => {
		this.props.history.goBack();
	}
	
	handleSubmit = (values) => {
		this.props.dispatch(addBirthday(values))
    }
    
    onSelect = (date) => {
        console.log(date)
    }

	render(){
        this.search = getGivenSearch(this.props, ['id']);
        const birthday = this.props.fetchBirthdayListResult 
                        && this.props.fetchBirthdayListResult.info 
                        && this.props.fetchBirthdayListResult.info.data
                        && this.props.fetchBirthdayListResult.info.data[0];
        let date = moment(birthday && birthday.date).format('YYYY-MM-DD');
        if(birthday && birthday.dateType == '2'){
            let lunarDate = chineseLunar.solarToLunar(new Date(moment(date).format('YYYY-MM-DD 00:00:00')));
            date = date + ' ' +chineseLunar.format(lunarDate, 'T(A)Md');
        }
        const labelCol= {
            xs: { span: 24 },
            sm: { span: 10 },
            md: { span: 10 },
        },
        wrapperCol= {
            xs: { span: 24 },
            sm: { span: 14 },
            md: { span: 14 },
        };
		return (
			<Card
				title="基本信息"
				className={PREFIX}
				>
				<div className={`${PREFIX}-container`}>
                    <Row>
                        <Col {...labelCol} className={`${PREFIX}-label`}>名字：</Col>
                        <Col {...wrapperCol}>{birthday && birthday.name}</Col>
                    </Row>
                    <Row>
                        <Col {...labelCol} className={`${PREFIX}-label`}>生日日期：</Col>
                        <Col {...wrapperCol}>{date}</Col>
                    </Row>
                    <Row>
                        <Col {...labelCol} className={`${PREFIX}-label`}>生日类型：</Col>
                        <Col {...wrapperCol}>{birthday && birthday.dateType && birthday.dateType == '1' ? '阳历' : '阴历'}</Col>
                    </Row>
                    <Row>
                        <Col {...labelCol} className={`${PREFIX}-label`}>提前提醒天数：</Col>
                        <Col {...wrapperCol}>{birthday && birthday.advanceDay}天</Col>
                    </Row>
                    <Row>
                        <Col {...labelCol} className={`${PREFIX}-label`}>提醒邮箱：</Col>
                        <Col {...wrapperCol}>{birthday && birthday.email}</Col>
                    </Row>
                    <Row>
                        <Col {...labelCol} className={`${PREFIX}-label`}>备忘录：</Col>
                        <Col {...wrapperCol}>{birthday && birthday.content}</Col>
                    </Row>
                    <Row gutter={16} className={`${PREFIX}-button-group`}>
                        <Col {...labelCol} className={`${PREFIX}-label`}>
                            <Button  type="primary">
                                <Link to={`/admin/birthday/edit?id=${this.search.id}`} >编辑 </Link>
                            </Button>
                        </Col>
                        <Col {...wrapperCol}>
                            <Button onClick={this.goBack}>
                                返回
                            </Button>
                        </Col>
                    </Row>
				</div>
			</Card>
		)
	}
}

export default withRouter(BirthdayAdd)