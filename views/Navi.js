import { Layout, Menu, Breadcrumb, Icon, Checkbox } from 'antd'
import React, { Component } from 'react'
import 'antd/dist/antd.css'
import logo from '../public/images/logo.svg'
import '../public/css/Navi.css'
//import TreeCompontent from './Tree'
//import Simple from './Simple'

import batchModel from '../util/batchModel'
import hisdataModel from '../util/hisdataModel'

const { Header, Content, Footer, Sider } = Layout

const SubMenu = Menu.SubMenu

class SiderDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      mode: 'inline'
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    return (
      <Layout>
        <Sider
          style={{ background: '#fff' }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
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
              <Menu.Item key="sub1-1"><Checkbox>批次1</Checkbox></Menu.Item>
              <Menu.Item key="sub1-2"><Checkbox>批次2</Checkbox></Menu.Item>
              <Menu.Item key="sub1-3"><Checkbox>批次3</Checkbox></Menu.Item>
              <Menu.Item key="sub1-4"><Checkbox>批次4</Checkbox></Menu.Item>
            </SubMenu>
            <SubMenu 
              key="sub2" 
              title={<span><Icon type="mail" /><span>1#-2017</span></span>}
            >
              <Menu.Item key="sub2-1"><Checkbox>批次1</Checkbox></Menu.Item>
              <Menu.Item key="sub2-2"><Checkbox>批次2</Checkbox></Menu.Item>
              <Menu.Item key="sub2-3"><Checkbox>批次3</Checkbox></Menu.Item>
              <Menu.Item key="sub2-4"><Checkbox>批次4</Checkbox></Menu.Item>
            </SubMenu> 
            <SubMenu 
              key="sub3" 
              title={<span><Icon type="mail" /><span>1#-2018</span></span>}
            >
              <Menu.Item key="sub3-1"><Checkbox>批次1</Checkbox></Menu.Item>
              <Menu.Item key="sub3-2"><Checkbox>批次2</Checkbox></Menu.Item>
              <Menu.Item key="sub3-3"><Checkbox>批次3</Checkbox></Menu.Item>
              <Menu.Item key="sub3-4"><Checkbox>批次4</Checkbox></Menu.Item>
            </SubMenu>          
            {/*
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>            
            <Menu.Item key="2">
              {/*<Icon type="video-camera" />}
              <Checkbox>
                <span className="nav-text">nav 2</span>
              </Checkbox>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#000', padding: 0 }}>
            <span style={{ color: '#fff', paddingLeft: '2%', fontSize: '1.4em' }}>
              <Icon 
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                style={{ cursor: 'pointer' }}
              />
            </span>
            <span style={{ color: '#fff', paddingLeft: '2%', fontSize: '1.4em' }}>自动化数据可视化系统</span>
            <span style={{ color: '#fff', float: 'right', paddingRight: '1%' }}>
              <img src={logo} className="App-logo" alt="logo" />
            </span>
          </Header>
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
          <Footer style={{ textAlign: 'center' }}>
            And Design @2018 Created by Ant UED, Nathan
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default SiderDemo