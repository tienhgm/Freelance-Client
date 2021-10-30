import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import Dialog from "features/Auth/Dialog";
import routesConfiguration from "routers/routesConfig";
import { useAppSelector } from "app/hooks";
import SideBar from "./Components/SideBar";
export default function Header() {
  const [showDialog, setShowDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const openRegisterForm = () => {
    setShowDialog(true);
    setIsLogin(false);
  };
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="px-28 header">
      <div className="flex">
        <div className="header__title">
          <Link to="/">
            Free<span>lance</span>
          </Link>
        </div>
        <ul className="menu">
          {Object.entries(routesConfiguration).map(([key, route]) => (
            <li className="menu-item" key={key}>
              <NavLink to={route.path} className="menu__link" exact>
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        {user.lastName ? (
          <div>{`${user.lastName + user.firstName}`}</div>
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
    </div>
  );
}
