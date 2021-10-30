import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import routesConfiguration from "routers/routesConfig";
import "./index.scss";
export default function SideBar() {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Menu"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Menu
          className="h-full grid-cols-3 pb-10 overflow-x-hidden"
          mode="inline"
        >
          {Object.entries(routesConfiguration).map(([key, route]) => (
            <Menu.Item key={key}>
              <NavLink to={route.path} exact>
                {route.name}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
}
