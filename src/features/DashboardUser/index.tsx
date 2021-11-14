import { Switch, Link, Route, useRouteMatch, useHistory } from 'react-router-dom';
import './index.scss';
import { Menu } from 'antd';
import Settings from './Components/Settings';
import React, { useEffect } from 'react';
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
import ChangePassword from './Components/ChangePassword';
import Dashboard from './Components/Dashboard';
import Bookmarks from './Components/Bookmarks';
import Jobs from './Components/JobsManage';
import Candidates from './Components/CandidateManage';
import PostJob from './Components/PostJob';
import Message from './Components/Message';
import { useAppSelector } from 'app/hooks';
import MyJobs from './Components/MyJobs';
import './index.scss';
import Reviews from './Components/Reviews';

function DashboardUser() {
  const userRole = useAppSelector((state) => state.auth.user.role);

  const { SubMenu } = Menu;
  const match = useRouteMatch();
  const menuUser = [
    { key: 1, icon: <AppstoreOutlined />, link: '/dashboard', name: 'Dashboard' },
    { key: 2, icon: <FolderOpenOutlined />, link: '/dashboard/my-jobs', name: 'My Jobs', role: 2 },
    { key: 3, icon: <StarOutlined />, link: '/dashboard/bookmarks', name: 'Bookmarks' },
    { key: 4, icon: <MessageOutlined />, link: '/dashboard/message', name: 'Message' },
    { key: 5, icon: <BookOutlined />, link: '/dashboard/reviews', name: 'Reviews' },
    { key: 6, icon: <SettingOutlined />, link: '/dashboard/settings', name: 'Settings' },
    { key: 7, icon: <LockOutlined />, link: '/dashboard/password', name: 'Change password' },
  ];
  const menuManage = [
    { key: 8, icon: '', link: '/dashboard/jobs-manage', name: 'Manage Jobs' },
    { key: 9, icon: '', link: '/dashboard/candidate-manage', name: 'Manage Candidates' },
    { key: 10, icon: '', link: 'post-jobs', name: 'Post A Job' },
  ];
  const history = useHistory();
  useEffect(() => {
    document.querySelector('.header > div > ul > li:nth-child(5) > a')?.classList.add('active');
  }, [history.location.pathname]);

  return (
    <div className="flex h-full overflow-y-hidden">
      <Menu
        className="h-full grid-cols-3 pb-10 overflow-x-hidden"
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {menuUser.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.name}</Link>
          </Menu.Item>
        ))}
        {userRole && (
          <>
            <SubMenu key="sub2" icon={<ApartmentOutlined />} title="Jobs">
              {menuManage.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.link}>{item.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          </>
        )}
      </Menu>
      <div className="w-full p-6 overflow-y-auto dashboard-content">
        <Switch>
          <Route path={`${match.url}`} component={Dashboard} exact />
          <Route path={`${match.url}/my-jobs`} component={MyJobs} exact />
          <Route path={`${match.url}/settings`} component={Settings} exact />
          <Route path={`${match.url}/message`} component={Message} exact />
          <Route path={`${match.url}/bookmarks`} component={Bookmarks} exact />
          <Route path={`${match.url}/reviews`} component={Reviews} exact />
          <Route path={`${match.url}/jobs-manage`} component={Jobs} exact />
          <Route path={`${match.url}/post-jobs`} component={PostJob} exact />
          <Route path={`${match.url}/candidate-manage`} component={Candidates} exact />
          <Route path={`${match.url}/password`} component={ChangePassword} exact />
        </Switch>
      </div>
    </div>
  );
}

export default DashboardUser;
