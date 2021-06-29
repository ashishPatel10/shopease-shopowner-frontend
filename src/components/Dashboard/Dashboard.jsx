import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./Dashboard.scss";
import { Switch } from "react-router-dom";

import PrivateRoute from "../../routes/privateRoutes";
import Categories from "../Categories/Categories";
import Profiles from "../Profiles/Profiles";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {" "}
          {collapsed ? <h2>SS</h2> : <h2>ShopEASE</h2>}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Profiles
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Managing Categories
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Managing Products
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100vh",
          }}
        >
          <Switch>
            <PrivateRoute
              exact={true}
              path="/categories"
              component={Categories}
            />
            {/* <PrivateRoute exact={true} path="/products" component={Products} /> */}
            <PrivateRoute exact={true} path="/profiles" component={Profiles} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
