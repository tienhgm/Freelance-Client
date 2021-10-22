import { LockOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import "./index.scss";
export default function ChangePassword() {
  return (
    <div>
      <h1 className="text-2xl">Password</h1>
      <div className="h-full password">
        <div className="password__title">
          <div className="flex items-center ">
            <LockOutlined style={{ color: "#2e3fe5" }} className="mr-4" />
            Password and Security
          </div>
          <div className="flex flex-col w-1/3 my-4">
            <div className="">
              <div className="mb-3 text-xl font-bold">Current Password</div>
              <Input placeholder="current password" size="large" />
            </div>
            <div className="">
              <div className="mb-3 text-xl font-bold">New Password</div>
              <Input placeholder="New password" size="large" />
            </div>
            <div className="">
              <div className="mb-3 text-xl font-bold">Repeat New Password</div>
              <Input placeholder="Repeat new password" size="large" />
            </div>
          </div>
        </div>
      </div>
      <div className="pb-6 mt-4">
        <Button type="primary" size="large">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
