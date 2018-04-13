import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout
class LayoutFooter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Footer style={{ textAlign: 'center' }}>
        Ant Design @2018 Created by Ant UED, Nathan
      </Footer>
    )
  }
}

export default LayoutFooter