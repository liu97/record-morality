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
    this.echartsOption = _.cloneDeep(NOTE_ECHARTS_OPTION);
    this.echatsRef = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    let { fetchNoteTrendResult } = nextProps;
    if(fetchNoteTrendResult && !fetchNoteTrendResult.isLoading && !_.isEqual(fetchNoteTrendResult, this.props.fetchNoteTrendResult)){
      this.initTrendMap(fetchNoteTrendResult.info.data);
    }
  }

  initTrendMap = (data) => {
    this.echartsOption.xAxis.data = [];
    this.echartsOption.series.data = [];
    data.forEach(item => {
      this.echartsOption.xAxis.data.push(...Object.keys(item));
      this.echartsOption.series.data.push(...Object.values(item));
    });
    this.echatsRef.current.getEchartsInstance().setOption(this.echartsOption);
  }

  render() {
    return (
      <ReactEcharts
        ref={this.echatsRef}
        option={this.echartsOption}
        theme="clear"
        notMerge={true}
      />
    )
  }
}

export default NoteEcharts