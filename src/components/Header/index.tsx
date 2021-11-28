import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './index.scss';
import { Menu, Dropdown, Avatar } from 'antd';
import routesConfiguration from 'routers/routesConfig';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import SideBar from './Components/SideBar';
import { UserOutlined } from '@ant-design/icons';
import { logout } from 'app/slices/authSlice';
import Popup from 'components/PopupConfirm';
import { logoutUser } from 'app/slices/userSlice';
export default function Header() {
  const user = useAppSelector((state) => state.user.curUser);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutUser());
    setOpenDialogConfirm(false);
  };
  const goToLogin = () => {
    history.push('/login');
  };
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const handleOpenDialogConfirm = () => {
    setOpenDialogConfirm(true);
  };
  // @ts-ignore
  const userAvt = useAppSelector((state) => state.user.curUser.avatar);
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div>{'Hi ' + user?.firstName + user?.lastName + ' !'}</div>
      </Menu.Item>
      {
        <Menu.Item key="2">
          <Link to="/dashboard" style={{ color: 'black' }}>
            Dashboard
          </Link>
        </Menu.Item>
      }
      <Menu.Item key="3">
        <Link to="/dashboard/bookmarks" style={{ color: 'black' }}>
          bookmarks
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <div style={{ color: 'black' }} onClick={handleOpenDialogConfirm}>
          Logout
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="lg:px-28 md:px-24 xs:px-16 header">
      <div className="flex">
        <div className="header__title">
          <Link to="/">
            Hi<span>reo</span>
          </Link>
        </div>
        <ul className="menu">
          {Object.entries(routesConfiguration).map(
            ([key, route]) =>
              route.navbar && (
                <li className="menu-item" key={key}>
                  <NavLink to={route.path} className="menu__link" exact>
                    {route.name}
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        {user?.lastName ? (
          <Dropdown overlay={menu} trigger={['click']}>
            {userAvt ? (
              <img
                src={`http://${userAvt}`}
                alt="avatar"
                width="35"
                height="35"
                style={{ borderRadius: '50%', cursor: 'pointer' }}
              />
            ) : (
              <Avatar size="large" className="cursor-pointer" icon={<UserOutlined />} />
            )}
          </Dropdown>
        ) : (
          <div className="btn-register" onClick={goToLogin}>
            Login
          </div>
        )}
        <div className="side-bar">
          <SideBar />
        </div>
      </div>
      <Popup
        title="Logout"
        isVisible={openDialogConfirm}
        popupText="Logout?"
        handleConfirm={handleLogout}
        handleCancelConfirm={() => setOpenDialogConfirm(false)}
      />
    </div>
  );
}
