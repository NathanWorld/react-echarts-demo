import React, { Component } from 'react'
import { Layout, Icon } from 'antd'
import logo from '../public/images/logo.svg'

const { Header } = Layout
class LayoutHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Header style={{ background: '#000', padding: 0 }}>
        <span style={{ color: '#fff', paddingLeft: '2%', fontSize: '1.4em' }}>
          <Icon 
            className="trigger"
            type={this.props.icontype ? 'menu-unfold' : 'menu-fold'}
            onClick={() => this.props.toggle(!this.props.icontype)}
            style={{ cursor: 'pointer' }}
          />
        </span>
        <span style={{ color: '#fff', paddingLeft: '2%', fontSize: '1.4em' }}>自动化数据可视化系统</span>
        <span style={{ color: '#fff', float: 'right', paddingRight: '1%' }}>
          <img src={logo} className="App-logo" alt="logo" />
        </span>
      </Header> 
    )
  }
}

export default LayoutHeader