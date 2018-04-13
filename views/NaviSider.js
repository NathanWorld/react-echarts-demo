import React, { Component } from 'react'
import { Layout, Menu, Icon, Checkbox } from 'antd'
import logo from '../public/images/logo.svg'

const SubMenu = Menu.SubMenu
const { Sider } = Layout

class NaviSider extends Component {
  constructor(props) {
    super(props)
  }
  handleChecked(e, value) {
    if (e.target.checked) alert(value)
  }

  render() {
    return(
      <Sider
        style={{ background: '#fff' }}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo" />
        {/* <TreeCompontent /> */}
        <Menu 
          theme="light" 
          mode="inline" 
          defaultSelectedKeys={['']}
        >
          <SubMenu 
            key="sub1" 
            title={<span><Icon type="mail" /><span>1#-2016</span></span>}
          >
            {
              this.props.batches.map((batch, index) => 
                <Menu.Item key={batch.batch}>
                  <Checkbox onChange={(e) => this.handleChecked(e, batch.batch)}>{batch.batch}</Checkbox>
                </Menu.Item>
              )
            }
          </SubMenu>
        </Menu>
      </Sider>  
    )
  }
}

export default NaviSider