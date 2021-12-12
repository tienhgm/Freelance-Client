import { Switch, Link, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import './index.scss';
import { Col, Menu, Row } from 'antd';
import Settings from './Components/SettingUser';
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BookOutlined,
  FolderOpenOutlined,
  LockOutlined,
  MessageOutlined,
  SettingOutlined,
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
import SettingCompany from './Components/SettingCompany';
import './index.scss';
import { useEffect, useState } from 'react';
import { getPathKey } from 'helpers/Dashboard';
import NotFound from 'components/NotFound';

// const ChangePassword = lazy(() => import('./Components/ChangePassword'));
function DashboardUser() {
  const userRole = useAppSelector((state) => state.user.curUser.role);
  const [key, setKey] = useState<any>(null);
  const { SubMenu } = Menu;
  const match = useRouteMatch();
  const menuUser = [
    { key: 1, icon: <AppstoreOutlined />, link: '/dashboard', name: 'Dashboard' },
    { key: 4, icon: <MessageOutlined />, link: '/dashboard/message', name: 'Message' },
    { key: 5, icon: <BookOutlined />, link: '/dashboard/reviews', name: 'Reviews' },
    { key: 7, icon: <LockOutlined />, link: '/dashboard/password', name: 'Change password' },
  ];
  const menuUserRole2 = [
    { key: 2, icon: <FolderOpenOutlined />, link: '/dashboard/my-jobs', name: 'My Jobs' },
    { key: 6, icon: <SettingOutlined />, link: '/dashboard/settings', name: 'Settings' },
    // { key: 3, icon: <StarOutlined />, link: '/dashboard/bookmarks', name: 'Bookmarks' },
  ];
  const menuUserRole1 = [
    { key: 8, icon: <SettingOutlined />, link: '/dashboard/setting-company', name: 'Setting company' },
    { key: 9, icon: '', link: '/dashboard/jobs-manage', name: 'Manage Jobs' },
    { key: 10, icon: '', link: '/dashboard/post-jobs', name: 'Post A Job' },
  ];
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname.split('/')[2];
    let handleKey = getPathKey(path);
    setKey(handleKey);
    return () => {
      setKey('1')
    }
  }, [location.pathname.split('/')[2]]);
  return (
    <Row>
      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        {key && (
          <Menu style={{ width: 240 }} defaultSelectedKeys={[key]} defaultOpenKeys={['sub1']} mode="inline">
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
                <Menu.Item icon={menuUserRole1[0].icon}>
                  <Link to={menuUserRole1[0].link}>{menuUserRole1[0].name}</Link>
                </Menu.Item>
                <SubMenu key="sub2" icon={<ApartmentOutlined />} title="Jobs">
                  {menuUserRole1
                    .filter((item) => item.key !== 8)
                    .map((item) => (
                      <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.link}>{item.name}</Link>
                      </Menu.Item>
                    ))}
                </SubMenu>
              </>
            )}
          </Menu>
        )}
      </Col>
      <Col xs={24} sm={12} md={20} lg={20} xl={20} className="p-3">
        <Switch>
          <Route path={`${match.url}`} component={Dashboard} exact />
          <Route path={`${match.url}/my-jobs`} exact>
            {userRole === 2 ? <MyJobs /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path={`${match.url}/settings`} component={Settings} exact>
            {userRole === 2 ? <Settings /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path={`${match.url}/setting-company`} component={SettingCompany} exact>
            {userRole === 1 ? <SettingCompany /> : <Redirect to="/dashboard" />}
          </Route>
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
          <Route component={NotFound} />
        </Switch>
      </Col>
    </Row>
  );
}

export default DashboardUser;
