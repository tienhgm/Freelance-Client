import React from "react";
import { Switch, Link, Route, useRouteMatch } from "react-router-dom";
import "./index.scss";
import { Menu, Divider, Badge } from "antd";
import Settings from "./Components/Settings";
import {
  AppstoreOutlined,
  BookOutlined,
  MessageOutlined,
  SettingOutlined,
  StarOutlined,
} from "@ant-design/icons";

function DashboardUser() {
  const { SubMenu } = Menu;
  const handleClick = (e: any) => {
    console.log("click ", e);
  };
  const match = useRouteMatch();
  console.log(match.url);
  return (
    <div className="flex h-screen overflow-y-auto">
      <Menu
        className="h-screen grid-cols-3 overflow-x-hidden overflow-y-auto"
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Divider orientation="left" style={{ color: "#2e3fe5" }}>
          Start
        </Divider>
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<MessageOutlined />}>
          Message
        </Menu.Item>
        <Menu.Item key="3" icon={<StarOutlined />}>
          Bookmarks
        </Menu.Item>
        <Menu.Item key="4" icon={<BookOutlined />}>
          Reviews
        </Menu.Item>
        <Divider orientation="left" style={{ color: "#2e3fe5" }}>
          Organize and Manage
        </Divider>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Jobs">
          <Menu.Item key="5">
            Manage Jobs <Badge count={5}></Badge>
          </Menu.Item>
          <Menu.Item key="6">Manage Candidates</Menu.Item>
          <Menu.Item key="7">Post a job</Menu.Item>
        </SubMenu>
        <Divider orientation="left" style={{ color: "#2e3fe5" }}>
          Account
        </Divider>
        <Menu.Item key="9" icon={<SettingOutlined />}>
          <Link to={'/dashboard/settings'}>Settings</Link>
        </Menu.Item>
      </Menu>
      <div className="w-full m-14">
        <Switch>
          <Route path={`${match.url}/settings`} component={Settings}  />
        </Switch>
      </div>
    </div>
  );
}

export default DashboardUser;
