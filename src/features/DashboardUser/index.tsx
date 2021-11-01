import { Switch, Link, Route, useRouteMatch } from "react-router-dom";
import "./index.scss";
import { Menu, Divider } from "antd";
import Settings from "./Components/Settings";
import {
  AppstoreOutlined,
  BookOutlined,
  LockOutlined,
  MessageOutlined,
  SettingOutlined,
  StarOutlined,
} from "@ant-design/icons";
import ChangePassword from "./Components/ChangePassword";
import Dashboard from "./Components/Dashboard";
import Bookmarks from "./Components/Bookmarks";
import Jobs from "./Components/JobsManage";
import Candidates from "./Components/CandidateManage";
import Message from "./Components/Message";
import "./index.scss";

function DashboardUser() {
  const { SubMenu } = Menu;
  const match = useRouteMatch();
  return (
    <div className="flex h-full overflow-y-hidden">
      <Menu
        className="h-full grid-cols-3 pb-10 overflow-x-hidden"
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Divider orientation="left" style={{ color: "#2e3fe5" }}>
          Start
        </Divider>
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          <Link to={"/dashboard"}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<MessageOutlined />}>
          <Link to={"/dashboard/message"}>Message</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<StarOutlined />}>
          <Link to={"/dashboard/bookmarks"}>Bookmarks</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BookOutlined />}>
          Reviews
        </Menu.Item>
        <Divider orientation="left" style={{ color: "#2e3fe5" }}>
          Organize and Manage
        </Divider>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Jobs">
          <Menu.Item key="5">
            <Link to={"/dashboard/jobs-manage"}>Manage Jobs</Link>
          </Menu.Item>
          <Menu.Item key="6"> <Link to={"/dashboard/candidate-manage"}>Manage Candidates</Link></Menu.Item>
          <Menu.Item key="7">Post a job</Menu.Item>
        </SubMenu>
        <Divider orientation="left" style={{ color: "#2e3fe5" }}>
          Account
        </Divider>
        <Menu.Item key="9" icon={<SettingOutlined />}>
          <Link to={"/dashboard/settings"}>Settings</Link>
        </Menu.Item>
        <Menu.Item key="10" icon={<LockOutlined />}>
          <Link to={"/dashboard/password"}>Change password</Link>
        </Menu.Item>
      </Menu>
      <div className="dashboard-content w-full p-6 overflow-y-auto">
        <Switch>
          <Route path={`${match.url}`} component={Dashboard} exact />
          <Route path={`${match.url}/settings`} component={Settings} exact />
          <Route path={`${match.url}/message`} component={Message} exact />
          <Route path={`${match.url}/bookmarks`} component={Bookmarks} exact />
          <Route path={`${match.url}/jobs-manage`} component={Jobs} exact />
          <Route path={`${match.url}/candidate-manage`} component={Candidates} exact />
          <Route
            path={`${match.url}/password`}
            component={ChangePassword}
            exact
          />
        </Switch>
      </div>
    </div>
  );
}

export default DashboardUser;
