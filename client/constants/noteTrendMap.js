import echarts from 'echarts';

//柱状图Bar
export const NOTE_ECHARTS_OPTION = {
  title : {
    text: ' ',
    subtext: ' '
  },
  tooltip : {
    trigger: 'axis',
    axisPointer : {// 坐标轴指示器，坐标轴触发有效
      type : 'shadow'// 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data:['笔记数']
  },
  toolbox: {

  },
  calculable : true,
  xAxis : {
    data : []
  },
  yAxis :{
    type : 'value'
  },
  series :{
      name:'笔记数',
      type:'bar',
      itemStyle : {  
          normal : {  
            color: '#188df0'
          }  
      },  
      data:[],
      markPoint : {
          data : [
              {type : 'max', name: '最大值'},
              {type : 'min', name: '最小值'}
          ]
      },
      markLine : {
          data : [
              {type : 'average', name: '平均值'}
          ]
      }
  }
};