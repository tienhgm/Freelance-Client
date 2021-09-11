import { Link, NavLink, useRouteMatch } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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
  window.addEventListener("scroll", changeBgMenu);

  // isHomePage ? fixed : sticky
  const pathname = window.location.pathname;
  const match = useRouteMatch();
  const [isHomePage, setIsHomePage] = useState(false);
  useEffect(() => {
    const isHomePage = () => {
      const routerExcept = ["/"];
      const currentRouter = pathname
      return routerExcept.indexOf(currentRouter) !== -1;
    };
    setIsHomePage(isHomePage);
  }, [pathname]);
  console.log(isHomePage);
  console.log(pathname);
  return (
    <div
      className={`px-28 header ${isHomePage ? "fixed" : "sticky"} ${
        navbar ? "show-header" : ""
      }`}
    >
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
