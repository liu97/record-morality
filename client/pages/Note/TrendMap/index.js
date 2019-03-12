import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Card, Radio } from 'antd'
import NoteEcharts from '../Component/NoteEcharts';
import { fetchNoteTrend } from 'actions/note';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const PREFIX = 'trend-map';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
	})
)
class TrendMap extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(fetchNoteTrend({type: 'day'}));
  }

  handleTimeRadioChange = (e) => {
    let type = e.target.value;
    this.props.dispatch(fetchNoteTrend({type}))
  }

  getTimeExtraRender = () => {
    let graphRadio = [
      {title: '日视图', value: 'day'}, 
      {title: '月视图', value: 'month'},
      {title: '年视图', value: 'year'}
    ]

    return (
      <div>
        <RadioGroup 
          onChange={(e) => this.handleTimeRadioChange(e)} 
          defaultValue="day"
        >
          {
            graphRadio.map(item => <RadioButton value={item.value} key={item.value}>{item.title}</RadioButton>)
          }
        </RadioGroup>
      </div>
    )
  }

  render() {
    return (
      <div className={`${PREFIX}-container`} >
        <h2 className={`${PREFIX}-header`}>笔记趋势图</h2>
        <div className={`${PREFIX}-content`}>
          <Card 
            title=" "
            extra={this.getTimeExtraRender()}
          >
            <NoteEcharts />
          </Card>
        </div>

      </div>
    )
  }
}

export default TrendMap