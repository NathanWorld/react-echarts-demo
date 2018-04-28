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
// 缓存的批次数据
let cacheDataset = []
// 图表中要显示的数据
let chartDataset = []
// timestamp: moment(),
// TODO: 加入时间戳比对功能，超时之后能刷新缓存中的数据
// TODO: 限定缓存列表中的数量
chartDataset = chartDataset.concat(initData)

export default class Simple extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // dataSet: 用于 Chart 显示的数据集
      dataSet: chartDataset
    }
    this.getBatchHisdata = this.getBatchHisdata.bind(this)
    this.getOption = this.getOption.bind(this)
    this.onChartReady = this.onChartReady.bind(this)
    this.updateChartData = this.updateChartData.bind(this)
  }
  componentDidMount() {
    this.eventEmitterChecked = emitter.addListener('checked', (batch) => {
      this.setState({ loading: true })
      this.getBatchHisdata(batch)
    })
    this.eventEmitterUnchecked = emitter.addListener('unchecked', (batch) => {
      this.setState({ loading: true })
      this.uncheckedBatchHisdata(batch) 
      this.updateChartData()
    })
  }

  async getBatchHisdata(batch) {
    const url = 'http://localhost:3000/batches/' + batch
    await fetch(url)
      .then(res => res.json())
      .then(hisdata => {
        this.checkedBatchHisdata(batch, hisdata)
        this.updateChartData()
      })
  }
  checkedBatchHisdata(batch, hisdata) {
    let flag = false
    // 如果该批次历史数据已经缓存起来了，则设置为true
    for (let i = 0, len = cacheDataset.length; i < len; i++) {
      if (cacheDataset[i].batch === batch) {
        cacheDataset[i].checked = true
        return
      }
    }
    // 没有缓存则添加
    let newData = new Object()
    newData.batch = batch
    newData.data = hisdata
    newData.checked = true
    cacheDataset.push(newData)
  }
  uncheckedBatchHisdata(batch) {
    for (let i = 0, len = cacheDataset.length; i < len; i++) {
      if (cacheDataset[i].batch === batch) {
        cacheDataset[i].checked = false
        break
      }
    }
  }
  updateChartData() {
    let hasCheckedFlag = false
    chartDataset.splice(0, chartDataset.length)
    for (let i = 0, len = cacheDataset.length; i < len; i++) {
      if (cacheDataset[i].checked) {
        hasCheckedFlag = true
        chartDataset = chartDataset.concat(cacheDataset[i].data)
      }
    }
    if (!hasCheckedFlag) {
      chartDataset = chartDataset.concat(initData)
    }
    this.setState({
      loading: false,
      dataSet: chartDataset
    })
  }
  componentWillUnmount() {
    emitter.removeListener(this.eventEmitterChecked)
    emitter.removeListener(this.eventEmitterUnchecked)
  }
  
  // 已去除，不需要
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