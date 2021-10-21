import { useState } from "react";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

import UploadFile from "components/Dashboard/UploadFIle";
import "./index.scss";

export default function Settings() {
  return (
    <div className="settings">
      <h1 className="text-2xl">Settings</h1>
      <div className="account">
        <div className="account__title">
          <div className="flex items-center ">
            <UserOutlined style={{ color: "#2e3fe5" }} className="mr-4" /> My
            account
          </div>
        </div>
        <div className="grid grid-cols-12 my-4">
          <div className="self-center col-span-2 mt-4">
            <UploadFile />
          </div>
          <div className="col-span-9">
            <div className="grid grid-cols-12">
              <div className="col-span-6">
                <div className="mb-1 font-bold">First Name</div>
                <Input size="large" placeholder="First name" />
              </div>
              <div className="col-span-6 ml-6">
                <div className="mb-1 font-bold">Last Name</div>
                <Input size="large" placeholder="Last name" />
              </div>
            </div>
            <div className="grid-cols-9 mt-1">
              <div className="col-span-6">
                <div className="mb-1 font-bold">Email</div>
                <Input size="large" placeholder="Email" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 profile">
        <div className="profile__title">
          <div className="flex items-center ">
            <ShoppingOutlined style={{ color: "#2e3fe5" }} className="mr-4" /> My Profile
          </div>
        </div>
        <div className="grid grid-cols-12 my-4">
          <div className="self-center col-span-2 mt-4">
            <UploadFile />
          </div>
          <div className="col-span-9">
            <div className="grid grid-cols-12">
              <div className="col-span-6">
                <div className="mb-1 font-bold">First Name</div>
                <Input size="large" placeholder="First name" />
              </div>
              <div className="col-span-6 ml-6">
                <div className="mb-1 font-bold">Last Name</div>
                <Input size="large" placeholder="Last name" />
              </div>
            </div>
            <div className="grid-cols-9 mt-1">
              <div className="col-span-6">
                <div className="mb-1 font-bold">Email</div>
                <Input size="large" placeholder="Email" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
