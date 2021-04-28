import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom'//npm i npm i --save-dev @types/react-router-dom

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


const Sidebar=()=>{
    return (
        <>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Customer">
              <Menu.Item key="6"><Link to="/text-editor">Text editor </Link></Menu.Item>
              <Menu.Item key="7"><Link to="/TextEditorWys">Text EditorWys </Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        </>
    );

}

export default Sidebar;