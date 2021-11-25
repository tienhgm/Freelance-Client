import { Switch, Link, Route, useRouteMatch, useHistory } from 'react-router-dom';
import './index.scss';
import { Menu } from 'antd';
import Settings from './Components/Settings';
import { useEffect } from 'react';
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
    // { key: 9, icon: '', link: '/dashboard/candidate-manage', name: 'Manage Candidates' },
    { key: 10, icon: '', link: '/dashboard/post-jobs', name: 'Post A Job' },
  ];
  // const history = useHistory();
  // useEffect(() => {
  //   document.querySelector('.header > div > ul > li:nth-child(5) > a')?.classList.add('active');
  //   return () => {
  //     document.querySelector('.header > div > ul > li:nth-child(5) > a')?.classList.remove('active');
  //   }
  // }, [history.location.pathname]);

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
          <Route path={`${match.url}/jobs-manage`} component={JobsManage} />
          <Route path={`${match.url}/post-jobs`} component={PostJob} exact />
          <Route path={`${match.url}/password`} component={ChangePassword} exact />
        </Switch>
      </div>
    </div>
  );
}

export default DashboardUser;
