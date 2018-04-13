import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Simple extends Component {
  constructor(props) {
    super(props)
  }
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
    };
  };
  getOption2() {
    return {
      legend: { },
      tooltip: {
        trigger: 'axis'
      },
      dataset: {
        source: [
          ['datetime', 'tag1', 'tag2', 'tag3', 'tag4'],
          ['2018-04-10 07:00:00', '14.87',  '52.91',  '6.45',   '9.39'],
          ['2018-04-10 07:01:00',	'62.13', 	'97.09', 	'76.78', 	'19.26'],
          ['2018-04-10 07:02:00',	'61.99', 	'22.17', 	'35.38', 	'76.12' ],
          ['2018-04-10 07:03:00',	'10.00', 	'13.71', 	'29.21', 	'9.26' ],
          ['2018-04-10 07:04:00',	'15.39', 	'78.18', 	'17.16', 	'74.36' ],
        ]
      },
      xAxis: {
        type: 'category',
        gridIndex: 0
      },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {type: 'line', smooth: true},
        {type: 'line', smooth: true},
        {type: 'line', smooth: true},
        {type: 'line', smooth: true},
      ]
    }
  };

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts
            option={this.getOption()}
            style={{height: '80%', width: '90%'}}
            className='simple-chart' />
        </div>
      </div>
    );
  }
}