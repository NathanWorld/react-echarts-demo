import React, { Component } from 'react'
import { render } from 'react-dom'
//import ReactEcharts from 'echarts-for-react'
// import Simple from './Simple'
import SiderDemo from './views/Navi'

class App extends Component {
  render() {
    return (
      <div>
        Hello World!
      </div>
    )
  }
}

render(
  <SiderDemo />,
  //<App />,
  document.getElementById("root")
)