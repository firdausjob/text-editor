import React from 'react';
import { Provider } from 'react-redux';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import NaviBar from "./NaviBar"
import Sidebar from "./Sidebar"
import {BrowserRouter,Route} from "react-router-dom"
import EditorContainer from '../textEditor/EditorContainer';



const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <>
      <Layout>
        <NaviBar/>
        <Content>
          <Layout className="site-layout-background">
          <BrowserRouter>
            <Sidebar/>
              <Content> 
                <Route path="/">
                  
                </Route>
                
                <Route path="/text-editor">
                   <EditorContainer/>
                </Route>
              </Content>
              
            </BrowserRouter>
             
          </Layout>
        </Content>
      </Layout>
    </>
  );
}

export default App;