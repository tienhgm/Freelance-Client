import React, { useMemo } from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface ItemType {
  id: number;
  label: string;
};

type DropdownProps = {
  label: string;
  defaultValue?: number;
  placement?: string;
  listItem: ItemType[];
};

export default function DropdownInput({
  label,
  defaultValue,
  listItem,
  placement,
}: DropdownProps) {
  const menu = useMemo(
    () => (
      <Menu>
        {listItem.map((item) => (
          <Menu.Item key={item.id}>
            <span>{item.label}</span>
          </Menu.Item>
        ))}
      </Menu>
    ),
    [listItem]
  );
  return (
    <div className="dropdown-input flex">
      <span className="dropdown-input__label">{label}</span>
      <span className="dropdown-input__value">
        {listItem[defaultValue || 0]}
      </span>
      <i className="dropdown-input__icon" />
      {menu}
    </div>
  );
}
