import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

import moment from 'moment'
import emitter from '../util/events'

const initData = [
  {'datatime':'2018-04-10T07:00:00Z', 'TI301AI':'14.96',  'DO301AI':'52.91',  'PH301AI':'6.45',   'FI301AI':'9.39', 'PI301AI': '0.205'},
  {'datatime':'2018-04-10T07:01:00Z', 'TI301AI':'16.12',  'DO301AI':'48.77',  'PH301AI':'6.45',   'FI301AI':'9.39', 'PI301AI': '0.205'},
  {'datatime':'2018-04-10T07:02:00Z', 'TI301AI':'18.81',  'DO301AI':'56.89',  'PH301AI':'6.45',   'FI301AI':'9.39', 'PI301AI': '0.205'},
  {'datatime':'2018-04-10T07:03:00Z', 'TI301AI':'24.72',  'DO301AI':'53.78',  'PH301AI':'6.45',   'FI301AI':'9.39', 'PI301AI': '0.205'},
  {'datatime':'2018-04-10T07:04:00Z', 'TI301AI':'23.35',  'DO301AI':'63.89',  'PH301AI':'6.45',   'FI301AI':'9.39', 'PI301AI': '0.205'},
  {'datatime':'2018-04-10T07:05:00Z', 'TI301AI':'17.67',  'DO301AI':'62.91',  'PH301AI':'6.45',   'FI301AI':'9.39', 'PI301AI': '0.205'},
] 
const hisDataSet = []
const chartInitData = {
  name: 'init',
  data: initData
}
hisDataSet.push(chartInitData)

export default class Simple extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dataSet: initData
    }
    this.getBatchHisdata = this.getBatchHisdata.bind(this)
    this.getOption = this.getOption.bind(this)
    this.onChartReady = this.onChartReady.bind(this)
  }
  componentDidMount() {
    this.eventEmitterChecked = emitter.addListener('checked', (batch) => {
      this.setState({
        loading: true
      })
      this.getBatchHisdata(batch)
    })
    this.eventEmitterUnchecked = emitter.addListener('unchecked', (batch) => {
      alert('unchecked: ' + batch)
    })
  }

  async getBatchHisdata(batch) {
    const url = 'http://localhost:3000/batches/' + batch
    await fetch(url)
      .then(res => res.json())
      .then(hisdata => {
        this.setState({
          // dataSet: this.BuildData(hisdata),
          dataSet: hisdata,
          loading: false
        })
      })
      console.log(this.state.dataSet.length)
  }
  componentWillUnmount() {
    emitter.removeListener(this.eventEmitterChecked)
    emitter.removeListener(this.eventEmitterUnchecked)
  }
  
  BuildData(hisdata) {
    // let hisdate = JSON.parse(sourceHisdata)
    let data = []
    hisdata.forEach((element, index) => {
      if (index < 1) {
        let headerArray = new Array()
        for (let item in element) {
          headerArray.push(item)
        }
        data.push(headerArray)
      }
      let itemArray = new Array()
      for (let item in element) {
        if (item === 'datetime') {
          itemArray.push(moment(element[item]).format('YYYY-MM-DD HH:mm:ss'))
        } else {
          itemArray.push(element[item])
        }
      }
      data.push(itemArray)
    })
    return data
  }

  DemoBuildData() {
    let data = [
      ['datetime', 'tag1', 'tag2', 'tag3', 'tag4'],
      ['2018-04-10 07:00:00', '14.87',  '52.91',  '6.45',   '9.39'],
      ['2018-04-10 07:01:00',	'62.13', 	'97.09', 	'76.78', 	'19.26'],
      ['2018-04-10 07:02:00',	'61.99', 	'22.17', 	'35.38', 	'76.12' ],
      ['2018-04-10 07:03:00',	'10.00', 	'13.71', 	'29.21', 	'9.26' ],
      ['2018-04-10 07:04:00',	'15.39', 	'78.18', 	'17.16', 	'74.36' ],
    ]
    return data
  }
  onChartReady(chart) {
    chart.hideLoading();
  }
  getLoadingOption() {
    return {
      text: '加载中...',
      color: '#4413c2',
      textColor: '#270240',
      maskColor: 'rgba(194, 88, 86, 0.3)',
      zlevel: 0
    }
  }

  getOption() {
    return {
      legend: {},
      tooltip: {
        trigger: 'axis'
      },
      // useUTC: true,
      dataset: {
        // sourceHeader: false,
        // dimensions: ['datatime', 'TI301AI', 'DO301AI', 'PH301AI', 'FI301AI', 'PI301AI'],
        source: this.state.dataSet
      },
      xAxis: {
        type: 'time'
      },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      dataZoom: [{
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 10
      },{
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        left: '93%',
        start: 0,
        end: 100
      },{
        type: 'inside',
        xAxisIndex: [0],
        start: 0,
        end: 10
      },{
        type: 'inside',
        yAxisIndex: [0],
        start: 0,
        end: 100
      }],
      series: [
        {
          type: 'line', 
          name: 'TI301AI',
          encode: { x: 0, y: 1 },
          smooth: true
        },{
          type: 'line', 
          name: 'DO301AI',
          encode: { x: 0, y: 2 },
          smooth: true
        },{
          type: 'line', 
          name: 'PH301AI',
          encode: { x: 0, y: 3 },
          smooth: true
        },{
          type: 'line', 
          name: 'FI301AI',
          encode: { x: 0, y: 4 },
          smooth: true
        },{
          type: 'line',
          name: 'PI301AI',
          encode: { x: 0, y: 5 },
        }
      ]
    }
  }

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            onChartReady={this.onChartReady}
            loadingOption={this.getLoadingOption()}
            showLoading={this.state.loading}
            style={{height: '80%', width: '90%'}}
            className='simple-chart' />
        </div>
      </div>
    );
  }
}

/*
getOption() {
  return {
    title: {
      text: '折线图'
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        // type : 'time',
        boundaryGap : false,
        data : ['2018-04-10 15:00:00','2018-04-10 15:01:00','2018-04-10 15:02:00','2018-04-10 15:03:00','2018-04-10 15:04:00','2018-04-10 15:05:00','2018-04-10 15:06:00']
      }
    ],
    yAxis : [
      {
        // type : 'value'
      }
    ],
    series : [
      {
        name:'tag1',
        type:'line',
        smooth: true,
        // stack: '总量',
        // areaStyle: {normal: {}},
        data:[120, 132, 101, 134, 90, 230, 210],
      },
      {
        name:'tag2',
        type:'line',
        smooth: true,
        // stack: '总量',
        // areaStyle: {normal: {}},
        data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'tag3',
        type:'line',
        smooth: true,
        // stack: '总量',
        // areaStyle: {normal: {}},
        data:[150, 232, 201, 154, 190, 330, 410]
      }
    ]
  }
}
*/