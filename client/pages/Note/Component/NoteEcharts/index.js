import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';

import { NOTE_ECHARTS_OPTION } from 'constants/noteTrendMap';


const PREFIX = 'note-echarts';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
    fetchNoteTrendResult: state.fetchNoteTrendResult
	})
)
class NoteEcharts extends Component {
  constructor(props){
    super(props);
    this.echartsOption = NOTE_ECHARTS_OPTION;
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    let { fetchNoteTrendResult } = nextProps;
    if(fetchNoteTrendResult && !fetchNoteTrendResult.isLoading && !_.isEqual(fetchNoteTrendResult, this.props.fetchNoteTrendResult)){
      this.initTrendMap(fetchNoteTrendResult.info.data);
    }
  }

  initTrendMap = (data) => {
    data.forEach(item => {
      this.echartsOption.xAxis[0].data.push(...Object.keys(item));
      this.echartsOption.series[0].data.push(...Object.values(item));
    });
  }

  render() {
    debugger
    return (
      <div style={{height:"300px",width:"600px"}}>
        <ReactEcharts
          option={this.echartsOption}
          theme="clear"
          lazyUpdate={false}
        />
      </div>
    )
  }
}

export default NoteEcharts