import React from 'react';
import { Form, Button, Input } from 'antd';
import { REGEX_CHECK_EMAIL } from 'constants/regex';
import { MailOutlined, LockOutlined, CloseSquareFilled } from '@ant-design/icons';
import './style.scss';

function FormLogin() {
  const [form] = Form.useForm();
  return (
    <Form form={form} name="login" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <a href="/" className="absolute right-4 top-1"><CloseSquareFilled /></a>
      <div className="form-title">
        <h3 className="mt-20 mb-12">We're glad to see you again!</h3>
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
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be minimum 8 characters.' },
        ]}
      >
        <Input.Password placeholder="Password" size="large" autoComplete="false" prefix={<LockOutlined />} />
      </Form.Item>
      <div className="forgot-password">Forgot Password?</div>
      <Button type="primary" size="large" htmlType="submit">
        Log In
      </Button>
      <span>
        Don't have an account?{' '}
        <a href="/register" className="form-title__sign-up">
          Sign Up!
        </a>
      </span>
    </Form>
  );
}

export default FormLogin;
