import { useState } from 'react';
import { Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import './index.scss';
import { Switch, Link, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ManageUsers from './components/ManageUsers';
import ManageJobs from './components/ManageJobs';
import { useAppSelector } from 'app/hooks';

const menuAdmin = [
  { key: 1, icon: <AppstoreOutlined />, link: '/dashboard-admin', name: 'Dashboard' },
  { key: 2, icon: <UserOutlined />, link: '/dashboard-admin/manage-users', name: 'Manage Users' },
  { key: 3, icon: <ApartmentOutlined />, link: '/dashboard-admin/manage-jobs', name: 'Manage Jobs' },
];

function DashboardAdmin() {
  const match = useRouteMatch();

  const [collapsed, setCollapsed] = useState(false);
  const userRole = useAppSelector((state) => state.user.curUser.role);
  return (
    <>
      {userRole === 0 ? (
        <div className="flex admin">
          <div
            className="relative overflow-y-auto admin__menu"
            style={
              collapsed
                ? { width: 80, transition: 'background .2s,width .2s cubic-bezier(.2,0,0,1) 0s' }
                : { width: 256 }
            }
          >
            <Menu
              className="h-full transition"
              defaultSelectedKeys={[`1`]}
              defaultOpenKeys={['sub1']}
              mode="inline"
              inlineCollapsed={collapsed}
            >
              {menuAdmin.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.link}>{item.name}</Link>
                </Menu.Item>
              ))}
            </Menu>
            <div
              className="absolute w-full pt-2 pl-6 text-lg border-t cursor-pointer bottom-5 hover:text-blue-500"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </div>
          {/* content */}
          <div className="flex-1 p-6 overflow-y-auto admin__content">
            <Switch>
              <Route path={`${match.url}`} component={Dashboard} exact />
              <Route path={`${match.url}/manage-users`} component={ManageUsers} exact />
              <Route path={`${match.url}/manage-jobs`} component={ManageJobs} exact />
            </Switch>
          </div>
        </div>
      ) : (
        <Redirect to={'/'} />
      )}
    </>
  );
}

export default DashboardAdmin;
