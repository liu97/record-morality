import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';

import { NOTE_ECHARTS_OPTION } from 'constants/noteTrendMap';


const PREFIX = 'note-echarts';

class NoteEcharts extends Component {
  constructor(props){
    super(props);
    this.echartsOption = NOTE_ECHARTS_OPTION;
  }

  render() {
    return (
      <div style={{height:"600px",width:"600px"}}>
        <ReactEcharts
          option={this.echartsOption}
          theme="clear"
        />
      </div>
    )
  }
}

export default NoteEcharts