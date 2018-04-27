import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Checkbox } from 'antd'
import 'antd/dist/antd.css'
import '../public/css/Navi.css'
import NaviSider from './NaviSider'
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import LayoutFooter from './LayoutFooter';

const SubMenu = Menu.SubMenu

class SiderDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      batches: [],
      hisdata:[],
      collapsed: false,
      mode: 'inline'
    }
    this.getAllBatchInfo = this.getAllBatchInfo.bind(this)
  }
  async getAllBatchInfo() {
    const url = 'http://localhost:3000/batches'
    await fetch(url)
      .then(res => res.json())
      .then(batches => {
        this.setState({batches})
      })
  }
  async getBatchHisdata(batch) {
    const url = 'http://localhost:3000/batches/' + batch
    await fetch(url)
      .then(res => res.json())
      .then(hisdata => {
        this.setState({hisdata})
      })
  }
  componentDidMount() {
    this.getAllBatchInfo()
  }

  render () {
    return (
      <Layout>
        <NaviSider 
          collapsed={this.state.collapsed}
          batches={this.state.batches}
        />
        <Layout>
          <LayoutHeader 
            icontype={this.state.collapsed}
            toggle={val => this.setState({collapsed: val})}
          /> 
          <LayoutContent />
          <LayoutFooter />
        </Layout>
      </Layout>
    )
  }
}

export default SiderDemo