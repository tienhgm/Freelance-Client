import { Form, Button, Input } from 'antd';
import { MailOutlined, LockOutlined, UserAddOutlined, CloseSquareFilled,  } from '@ant-design/icons';
import { REGEX_CHECK_EMAIL } from 'constants/regex';
import './style.scss';

function FormRegister() {
  const [form] = Form.useForm();
  return (
    <Form form={form} name="login" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <a href="/" className="absolute right-4 top-1"><CloseSquareFilled /></a>
      <div className="form-title">
        <h3 className="mt-6 mb-9">Let's create your account!</h3>
      </div>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          {
            pattern: REGEX_CHECK_EMAIL,
            message: 'Email Invalid',
          },
        ]}
      >
        <Input placeholder="Email address" size="large" autoComplete="false" prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item
        name="firstName"
        rules={[
          { required: true, message: 'Please input your firstName!' },
          {
            message: 'Name Invalid',
          },
        ]}
      >
        <Input placeholder="please input first name" size="large" autoComplete="false" prefix={<UserAddOutlined />} />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          { required: true, message: 'Please input your lastName!' },
          {
            message: 'Name Invalid',
          },
        ]}
      >
        <Input placeholder="please input last name" size="large" autoComplete="false" prefix={<UserAddOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be minimum 8 characters.' },
        ]}
      >
        <Input.Password placeholder="Password" size="large" autoComplete="false" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        name="re_password"
        rules={[
          { required: true, message: 'Please input your password!' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password placeholder="Repeat Password" size="large" autoComplete="false" prefix={<LockOutlined />} />
      </Form.Item>
      <Button type="primary" size="large" htmlType="submit">
        Register
      </Button>
      <span>
        Already have an account?{' '}
        <a href="/login" className="form-title__sign-up">
          Log In!
        </a>
      </span>
    </Form>
  );
}

export default FormRegister;
