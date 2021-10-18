import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./index.scss";
import Dialog from "features/Auth/Dialog";
import routesConfiguration from "routers/routesConfig";

export default function Header() {
  // const [navbar, setNavbar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const openLoginForm = () => {
    setShowDialog(true);
    setIsLogin(true);
  };
  const openRegisterForm = () => {
    setShowDialog(true);
    setIsLogin(false);
  };
  // const changeBgMenu = () => {
  //   if (window.scrollY >= window.innerHeight - 700) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };
  // window.addEventListener("scroll", changeBgMenu);

  return (
    <div className={`px-28 header show-header`}>
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
      <div className="flex items-center">
        <div className="btn-login" onClick={openLoginForm}>
          Sign In
        </div>
        <div className="btn-register" onClick={openRegisterForm}>
          Register
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
