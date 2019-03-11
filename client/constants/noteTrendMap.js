//柱状图Bar
export const NOTE_ECHARTS_OPTION = {
  title : {
    text: ' ',
    subtext: ' '
  },
  tooltip : {
    trigger: 'axis',
    axisPointer : {// 坐标轴指示器，坐标轴触发有效
      type : 'line'// 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data:['成交量']
  },
  toolbox: {
    show : true,
    feature : {
      dataView : {show: true, readOnly: false},
      magicType : {show: true, type: ['line', 'bar']},
    }
  },
  calculable : true,
  xAxis : [
    {
      type : 'category',
      data : ['天海湾','鼎龙湾','珍珠湾','翠逸家园','紫林湾', '田螺湾', '香海彼岸', "花城都汇", "天蕴皖",'珍珠湾','翠逸家园','紫林湾', '田螺湾', '香海彼岸']
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
      {
          name:'成交量',
          type:'bar',
          data:[2100, 909, 7200, 1232, 4256, 5409, 1700, 6232, 3256, 7900, 1232, 4256, 5409, 1700],
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
  ]
};