import { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./index.scss";
import Dialog from "features/Auth/Dialog";
import { Menu, Dropdown, Avatar } from "antd";
import routesConfiguration from "routers/routesConfig";
import { useAppDispatch, useAppSelector } from "app/hooks";
import SideBar from "./Components/SideBar";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "app/slices/authSlice";
import Popup from "components/Popup";
export default function Header() {
  const [showDialog, setShowDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const openRegisterForm = () => {
    setShowDialog(true);
    setIsLogin(false);
  };
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
    setOpenDialogConfirm(false);

  };
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const handleOpenDialogConfirm = () => {
    setOpenDialogConfirm(true);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div>
            {"Hi " + user?.firstName + user?.lastName + " !"}
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div>
          <Link to="/dashboard" style={{ color: "black" }}>
            Dashboard
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div>
          <Link to="/dashboard/settings" style={{ color: "black" }}>
            Settings
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item key="4">
        <div style={{ color: "black" }} onClick={handleOpenDialogConfirm}>
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
            Free<span>lance</span>
          </Link>
        </div>
        <ul className="menu">
          {Object.entries(routesConfiguration).map(([key, route]) => (
            route.navbar && <li className="menu-item" key={key}>
              <NavLink to={route.path} className="menu__link" exact>
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        {user?.lastName ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar
              size="large"
              className="cursor-pointer"
              icon={<UserOutlined />}
            ></Avatar>
          </Dropdown>
        ) : (
          <div className="btn-register" onClick={openRegisterForm}>
            Login
          </div>
        )}
        <div className="side-bar">
          <SideBar />
        </div>
      </div>
      <Dialog
        isOpen={showDialog}
        isLogin={isLogin}
        closeDialog={() => setShowDialog(false)}
      />
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
