import { NavLink } from "react-router-dom";
import { Menu, Dropdown, Input, Button } from "antd";
import {
  GlobalOutlined,
  PushpinOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./index.scss";
import Logo from "../../assets/images/logo.png";
import Search from "../../assets/images/search.svg";

const login = (
  <Menu>
    <Menu.Item key="0">
      <p>Workers</p>
    </Menu.Item>
    <Menu.Item key="1">
      <p>Businesses</p>
    </Menu.Item>
  </Menu>
);

const en = (
  <Menu>
    <Menu.Item key="0">
      <p>Vietnamese</p>
    </Menu.Item>
    <Menu.Item key="1">
      <p>English</p>
    </Menu.Item>
  </Menu>
);

export default function Header() {
  return (
    <div className="header__wrapper">
      {/* header-menu */}
      <div className="flex h-10 leading-10 border-b border-gray-100">
        <div className="flex justify-start flex-1 ml-7">
          <NavLink to="/" className="flex-initial px-4 header__link">
            <div className="">Jobs</div>
          </NavLink>
          <NavLink to="/" className="flex-initial px-4 header__link">
            <div className="">Internships</div>
          </NavLink>
          <NavLink to="/" className="flex-initial px-4 header__link">
            <div className="">Blog</div>
          </NavLink>
        </div>
        <div className="flex justify-end flex-1 mr-7">
          <div className="flex h-5 my-auto leading-5 divide-x divide-gray-300">
            <div className="px-4">
              <Dropdown
                overlay={login}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <p className="cursor-pointer hover:text-blue-400">Log In</p>
              </Dropdown>
            </div>
            <div className="px-4">
              <Dropdown
                overlay={en}
                trigger={["click"]}
                placement="bottomCenter"
              >
                <p className="cursor-pointer hover:text-blue-400 relative">
                  <GlobalOutlined className="absolute left-0 top-0.5 " />
                  <span className="px-5">English</span>
                  <DownOutlined className="absolute right-0 top-0.5" />
                </p>
              </Dropdown>
            </div>
            <div className="px-4">
              <p className="font-bold text-blue-400 hover:text-blue-500 cursor-pointer relative">
                <PushpinOutlined className="absolute left-0 top-0.5" />
                <span className="pl-5">Post a Listing</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* end header menu */}
      {/* menu search */}
      <div className="flex h-20 leading-20 shadow-lg">
        <div className="my-auto flex mx-9">
          <img src={Logo} alt="logo" className="w-14 h-14" />
          <div className="my-auto text-3xl font-bold mx-2 text-blue-400">
            FREELANCE
          </div>
        </div>
        <div className="header__select"> 
          <select className="focus:ring-1 cursor-pointer">
            <option selected>Everythings</option>
            <option value="1">Jobs</option>
            <option value="2">Internships</option>
            <option value="3">Blog</option>
          </select>
        </div>
        <div>
          <Input
            className="header__search"
            placeholder="Search by keyword, or interest"
          />
        </div>
        <div>
          <Button className="header__button flex relative" type="primary">
              <img src={Search} alt="" width={18} className="header__icon absolute top-5 left-14" /> 
              <div className="text-xl ml-4">Search</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
