import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import "./index.scss";

export default function Header() {
  const [navbar, setNavbar] = useState(false);
  const changeBgMenu = () => {
    if (window.scrollY >= window.innerHeight - 200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  console.log(navbar);
  window.addEventListener("scroll", changeBgMenu);
  return (
    <div className={navbar ? "px-28 header show-header" : "px-28 header"}>
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
                Jobs Page &nbsp; <DownOutlined className="mt-1 down" />
              </span>
            </NavLink>
            <ul className="shadow-md menu__child">
              <li className="menu__child-item">
                <Link to="/" className="menu__link">
                  Full time
                </Link>
              </li>
              <li className="menu__child-item ">
                <Link to="/" className="menu__link">
                  Part time
                </Link>
              </li>
              <li className="menu__child-item">
                <Link to="/" className="menu__link">
                  Freelance
                </Link>
              </li>
            </ul>
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
          {/* <li className="menu-item">
            <Link to="/" className="menu__link">
              LOG IN
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/" className="menu__link">
              SIGN UP
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="flex items-center">
        <Link to="/" className="btn-login">
          Sign In
        </Link>
        <Link to="/" className="btn-register">
          Register
        </Link>
      </div>
    </div>
  );
}
