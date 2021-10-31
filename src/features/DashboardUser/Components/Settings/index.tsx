import { useState } from "react";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Button, Slider, Select } from "antd";
import UploadAvatar from "components/Dashboard/UploadAvatar";
import UploadFile from "components/Dashboard/UploadFileCv";
import "./index.scss";
const { Option } = Select;
const { TextArea } = Input;
export default function Settings() {
  const children = [];
  const [payHourly, setPayHourly] = useState(0);
  for (let i = 10; i < 36; i++) {
    children.push(
      // @ts-ignore
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  const handleSetPayHourly = (value: number) => {
    setPayHourly(value);
  };
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="h-full overflow-auto settings">
      <h1 className="text-2xl">Settings</h1>
      {/* info basic */}
      <div className="account">
        <div className="account__title">
          <div className="flex items-center ">
            <UserOutlined style={{ color: "#2e3fe5" }} className="mr-4" /> My
            account
          </div>
        </div>
        <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
          <div className="self-center col-span-2 mt-4">
            <UploadAvatar />
          </div>
          <div className="col-span-9">
            <div className="grid grid-cols-12">
              <div className="col-span-6">
                <div className="mb-1 text-xl font-bold">
                  First Name <span className="required-field">*</span>
                </div>
                <Input size="large" placeholder="First name" />
              </div>
              <div className="col-span-6 ml-6">
                <div className="mb-1 text-xl font-bold">
                  Last Name <span className="required-field">*</span>
                </div>
                <Input size="large" placeholder="Last name" />
              </div>
            </div>
            <div className="grid-cols-9 mt-1">
              <div className="col-span-6">
                <div className="mb-1 text-xl font-bold">
                  Email <span className="required-field">*</span>
                </div>
                <Input size="large" placeholder="Email" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /info basic */}
      {/* profile */}
      <div className="mt-8 profile">
        <div className="profile__title">
          <div className="flex items-center ">
            <ShoppingOutlined style={{ color: "#2e3fe5" }} className="mr-4" />{" "}
            My Profile
          </div>
        </div>
        <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1 profile__experience">
          <div className="col-span-3">
            <div className="mb-1 text-xl font-bold">
              Set your minimal hourly rate
            </div>
            <div className="text-lg font-medium">${payHourly}</div>
            <Slider max={150} value={payHourly} onChange={handleSetPayHourly} />
          </div>
          <div className="col-span-5 lg:ml-10">
            <div className="mb-3 text-xl font-bold">
              Skills <span className="required-field">*</span>
            </div>
            <Select
              mode="multiple"
              allowClear
              size="large"
              style={{ width: "100%" }}
              placeholder="Choose your skill"
              onChange={handleChange}
            >
              {children}
            </Select>
          </div>
          <div className="col-span-3 lg:ml-10">
            <div className="mb-3 text-xl font-bold">Attachments</div>
            <UploadFile disabled={false} />
          </div>
        </div>
        <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
          <div className="col-span-6">
            <div className="mb-3 text-xl font-bold">Tagline</div>
            <Input placeholder="tag line" size="large" />
          </div>
          <div className="col-span-5 lg:ml-10">
            <div className="mb-3 text-xl font-bold">City</div>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Select a city"
            >
              <Option value="jack">Ha Noi</Option>
              <Option value="lucy">Da Nang</Option>
              <Option value="tom">TPHCM</Option>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-12 my-4">
          <div className="col-span-5 mb-3 text-lg font-bold">
            Introduce yourself
          </div>
          <div className="col-span-11">
            <TextArea rows={4} autoSize={{ minRows: 3, maxRows: 5 }} />
          </div>
        </div>
      </div>
      {/* /profile */}
      <div className="pb-6 mt-4">
        <Button type="primary" size="large">Save Changes</Button>
      </div>
    </div>
  );
}
