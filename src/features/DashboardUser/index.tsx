import { Switch, Link, Route, useRouteMatch, Redirect } from 'react-router-dom';
import './index.scss';
import { Col, Menu, Row } from 'antd';
import Settings from './Components/Settings';
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BookOutlined,
  FolderOpenOutlined,
  LockOutlined,
  MessageOutlined,
  SettingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'app/hooks';
// import { lazy } from 'react';
import ChangePassword from './Components/ChangePassword';
import Dashboard from './Components/Dashboard';
import Bookmarks from './Components/Bookmarks';
import JobsManage from './Components/JobsManage';
import PostJob from './Components/PostJob';
import Message from './Components/Message';
import MyJobs from './Components/MyJobs';
import Reviews from './Components/Reviews';
import './index.scss';

// const ChangePassword = lazy(() => import('./Components/ChangePassword'));
// const Dashboard = lazy(() => import('./Components/Dashboard'));
// const Bookmarks = lazy(() => import('./Components/Bookmarks'));
// const JobsManage = lazy(() => import('./Components/JobsManage'));
// const PostJob = lazy(() => import('./Components/PostJob'));
// const Message = lazy(() => import('./Components/Message'));
// const MyJobs = lazy(() => import('./Components/MyJobs'));
// const Reviews = lazy(() => import('./Components/Reviews'));
function DashboardUser() {
  const userRole = useAppSelector((state) => state.user.curUser.role);

  const { SubMenu } = Menu;
  const match = useRouteMatch();
  const menuUser = [
    { key: 1, icon: <AppstoreOutlined />, link: '/dashboard', name: 'Dashboard' },
    { key: 4, icon: <MessageOutlined />, link: '/dashboard/message', name: 'Message' },
    { key: 5, icon: <BookOutlined />, link: '/dashboard/reviews', name: 'Reviews' },
    { key: 6, icon: <SettingOutlined />, link: '/dashboard/settings', name: 'Settings' },
    { key: 7, icon: <LockOutlined />, link: '/dashboard/password', name: 'Change password' },
  ];
  const menuUserRole2 = [
    { key: 2, icon: <FolderOpenOutlined />, link: '/dashboard/my-jobs', name: 'My Jobs' },
    // { key: 3, icon: <StarOutlined />, link: '/dashboard/bookmarks', name: 'Bookmarks' },
  ];
  const menuUserRole1 = [
    { key: 8, icon: '', link: '/dashboard/jobs-manage', name: 'Manage Jobs' },
    // { key: 9, icon: '', link: '/dashboard/candidate-manage', name: 'Manage Candidates' },
    { key: 10, icon: '', link: '/dashboard/post-jobs', name: 'Post A Job' },
  ];

  return (
    <Row>
      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        <Menu
          style={{ width: 240 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          {menuUser.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.name}</Link>
            </Menu.Item>
          ))}
          {userRole === 2 && (
            <>
              {menuUserRole2.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.link}>{item.name}</Link>
                </Menu.Item>
              ))}
            </>
          )}
          {userRole === 1 && (
            <>
              <SubMenu key="sub2" icon={<ApartmentOutlined />} title="Jobs">
                {menuUserRole1.map((item) => (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.link}>{item.name}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            </>
          )}
        </Menu>
      </Col>
      <Col xs={24} sm={12} md={20} lg={20} xl={20} className="p-3">
        <Switch>
          <Route path={`${match.url}`} component={Dashboard} exact />
          <Route path={`${match.url}/my-jobs`} exact>
            {userRole === 2 ? <MyJobs /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path={`${match.url}/settings`} component={Settings} exact />
          <Route path={`${match.url}/message`} component={Message} exact />
          <Route path={`${match.url}/bookmarks`} component={Bookmarks} exact>
            {userRole === 2 ? <Bookmarks /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path={`${match.url}/reviews`} component={Reviews} exact />
          <Route path={`${match.url}/jobs-manage`}>
            {userRole === 1 ? <JobsManage /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path={`${match.url}/post-jobs`} exact>
            {userRole === 1 ? <PostJob /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path={`${match.url}/password`} component={ChangePassword} exact />
        </Switch>
      </Col>
    </Row>
  );
}

export default DashboardUser;
