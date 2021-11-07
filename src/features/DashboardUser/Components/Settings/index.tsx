import { useState } from 'react';
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Slider, Select, Form } from 'antd';
import UploadAvatar from 'components/Dashboard/UploadAvatar';
import UploadFile from 'components/Dashboard/UploadFileCv';
import './index.scss';
import { useAppSelector } from 'app/hooks';
import { nationality, skills } from 'utils/enum';
const { Option } = Select;
const { TextArea } = Input;
export default function Settings() {
  const [form] = Form.useForm();
  const [minimalHourlyRate, setMinimalHourlyRate] = useState(0);
  const [listSkills, setListSkills] = useState([]);
  const handleSetPayHourly = (value: number) => {
    setMinimalHourlyRate(value);
  };
  const handleChange = (value: any) => {
    setListSkills(value);
  };
  const currentUser = useAppSelector((state) => state.auth.user);
  const onFinish = async (values: any) => {
    console.log(values);
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="h-full overflow-auto settings">
        <h1 className="text-2xl">Settings</h1>
        {/* info basic */}
        <div className="account">
          <div className="account__title">
            <div className="flex items-center ">
              <UserOutlined style={{ color: '#2e3fe5' }} className="mr-4" /> My account
            </div>
          </div>
          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="self-center col-span-2 mt-4">
              <UploadAvatar disabled={false} previewImg={currentUser.previewImg} />
            </div>
            <div className="col-span-9">
              <div className="grid-cols-9 mt-1 mb-3">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-bold">
                    Email <span className="required-field">*</span>
                  </div>
                  <Input size="large" value={currentUser.email} placeholder="Email" disabled />
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-bold">
                    First Name <span className="required-field">*</span>
                  </div>
                  <Form.Item name="firstName" rules={[{ required: true }]} initialValue={currentUser.firstName}>
                    <Input size="large" placeholder="First name" />
                  </Form.Item>
                </div>
                <div className="col-span-6 ml-6">
                  <div className="mb-1 text-xl font-bold">
                    Last Name <span className="required-field">*</span>
                  </div>
                  <Form.Item name="lastName" rules={[{ required: true }]} initialValue={currentUser.lastName}>
                    <Input size="large" placeholder="Last name" />
                  </Form.Item>
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
              <ShoppingOutlined style={{ color: '#2e3fe5' }} className="mr-4" /> My Profile
            </div>
          </div>
          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1 profile__experience">
            <div className="col-span-3">
              <div className="mb-1 text-xl font-bold">Set your minimal hourly rate</div>
              <div className="text-lg font-medium">${minimalHourlyRate}</div>
              <Form.Item name="minimalHourlyRate" initialValue={minimalHourlyRate ? minimalHourlyRate : 0}>
                <Slider max={150} onChange={handleSetPayHourly} />
              </Form.Item>
            </div>
            <div className="col-span-4 lg:ml-10">
              <div className="mb-3 text-xl font-bold">
                Skills <span className="required-field">*</span>
              </div>
              <Select
                mode="multiple"
                allowClear
                size="large"
                style={{ width: '100%' }}
                placeholder="Choose your skill"
                onChange={handleChange}
              >
                {skills.map((item, idx) => (
                  <Option value={item} key={idx}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-span-4 lg:ml-4">
              <div className="mb-3 text-xl font-bold">City</div>
              <Select size="large" style={{ width: '100%' }} placeholder="Select a city">
                {nationality.map((item, idx) => (
                  <Option value={item.value} key={idx}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 my-4">
            <div className="col-span-5 mb-3 text-lg font-bold">Introduce yourself</div>
            <div className="col-span-11">
              <TextArea rows={4} autoSize={{ minRows: 3, maxRows: 5 }} />
            </div>
          </div>
          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-3">
              <div className="mb-3 text-xl font-bold">Attachments</div>
              <UploadFile disabled={false} />
            </div>
          </div>
        </div>
        {/* /profile */}
        <div className="pb-6 mt-4">
          <Button type="primary" size="large" htmlType="submit">
            Save Changes
          </Button>
        </div>
      </div>
    </Form>
  );
}
