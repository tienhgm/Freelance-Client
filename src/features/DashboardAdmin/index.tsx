import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import './index.scss';
import { Switch, Link, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ManageUsers from './components/ManageUsers';
import ManageJobs from './components/ManageJobs';

const menuAdmin = [
  { key: 1, icon: <AppstoreOutlined />, link: '/dashboard-admin', name: 'Dashboard' },
  { key: 2, icon: <UserOutlined />, link: '/dashboard-admin/manage-users', name: 'Manage Users' },
  { key: 3, icon: <ApartmentOutlined />, link: '/dashboard-admin/manage-jobs', name: 'Manage Jobs' },
];

function DashboardAdmin() {
  const match = useRouteMatch();
 
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin flex">
      <div
        className="relative admin__menu overflow-y-auto"
        style={
          collapsed ? { width: 80, transition: 'background .2s,width .2s cubic-bezier(.2,0,0,1) 0s' } : { width: 256 }
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
            <Menu.Item
              key={item.key}
              icon={item.icon}
            >
              <Link to={item.link}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <div
          className="absolute border-t w-full bottom-5 pl-6 pt-2 text-lg cursor-pointer hover:text-blue-500"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      {/* content */}
      <div className="admin__content flex-1 p-6 overflow-y-auto">
        <Switch>
          <Route path={`${match.url}`} component={Dashboard} exact />
          <Route path={`${match.url}/manage-users`} component={ManageUsers} exact />
          <Route path={`${match.url}/manage-jobs`} component={ManageJobs} exact />
        </Switch>
      </div>
    </div>
  );
}

export default DashboardAdmin;
