import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./index.scss";
import Dialog from "features/Auth/Dialog";

export default function Header() {
  const [navbar, setNavbar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const openLoginForm = () => { setShowDialog(true); setIsLogin(true); }
  const openRegisterForm = () => { setShowDialog(true); setIsLogin(false); }
  const changeBgMenu = () => {
    if (window.scrollY >= window.innerHeight - 700) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBgMenu);

  return (
    <div className={`px-28 header  ${navbar ? "show-header" : ""}`}>
      <div className="flex">
        <div className="header__title">
          <Link to="/">
            Free<span>lance</span>
          </Link>
        </div>
        <ul className="menu">
          <li className="menu-item">
            <NavLink to="/" className="menu__link" exact>
              Home
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/posts" className="menu__link">
              <span className="flex items-center">
                Find Jobs
                {/* Find Jobs &nbsp; <DownOutlined className="mt-1 down" /> */}
              </span>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/freelancers" className="menu__link">
              For Freelancers
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/dashboard" className="menu__link">
              Dashboard
            </NavLink>
          </li>

          <li className="menu-item">
            <NavLink to="/about-us" className="menu__link">
              About Us
            </NavLink>
          </li>
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
      <Dialog isOpen={showDialog} isLogin={isLogin} closeDialog={() => setShowDialog(false)} />
    </div>
  );
}
