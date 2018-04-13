import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd'
import Simple from './Simple'

const { Content } = Layout
class LayoutContent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        {/*
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
          <Breadcrumb.Item>Nathan</Breadcrumb.Item>
        */}
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
          <Simple />
        </div>
      </Content>
    )
  }
}

export default LayoutContent