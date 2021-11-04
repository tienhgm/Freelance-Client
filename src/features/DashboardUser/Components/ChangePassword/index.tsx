import { LockOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { handleChangePassword } from 'app/slices/authSlice';
import './index.scss';
export default function ChangePassword() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    const { newPassword, repeatNewPassword } = values;
    if (newPassword === repeatNewPassword) {
      const objPassword = { ...values };
      delete objPassword.repeatNewPassword;
      try {
        await dispatch(handleChangePassword(objPassword));
        form.resetFields();
      } catch (error) {}
    }
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <h1 className="text-2xl">Password</h1>
      <div className="h-full password">
        <div className="password__title">
          <div className="flex flex-wrap items-center ">
            <LockOutlined style={{ color: '#2e3fe5' }} className="mr-4" />
            Password and Security
          </div>
          <div className="flex flex-col gap-4 my-4 lg:w-1/2 md:w-2/3 xs:w-full">
            <div className="">
              <Form.Item
                name="oldPassword"
                label="Current password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your current password!',
                  },
                  { min: 8, message: 'Password must be minimum 8 characters.' },
                ]}
              >
                <Input.Password placeholder="current password" size="large" />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                  { min: 8, message: 'Password must be minimum 8 characters.' },
                ]}
              >
                <Input.Password placeholder="New password" size="large" />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item
                name="repeatNewPassword"
                label="Repeat New Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your repeat new password!',
                  },
                ]}
              >
                <Input.Password placeholder="New password" size="large" />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-6 mt-4">
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
