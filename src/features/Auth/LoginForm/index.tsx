import { Form, Button, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./style.scss";
import { REGEX_CHECK_EMAIL } from "constants/regex";

type LoginFormProps = {
  onFormFinish: (values: any) => void;
  openRegisterForm: () => void;
};

function LoginForm({
  onFormFinish,
  openRegisterForm,
}: LoginFormProps) {
  const [form] = Form.useForm();
 
  return (
    <Form
      form={form}
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFormFinish}
    >
      <div className="form-title">
        <h3>We're glad to see you again!</h3>
        <span>Don't have an account? </span>
        <span className="form-title__sign-up" onClick={openRegisterForm}>
          Sign Up!
        </span>
      </div>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            pattern: REGEX_CHECK_EMAIL,
            message: "Email Invalid",
          },
        ]}
      >
        <Input
          placeholder="Email address"
          size="large"
          autoComplete="false"
          prefix={<MailOutlined />}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 8, message: "Password must be minimum 8 characters." },
        ]}
      >
        <Input.Password
          placeholder="Password"
          size="large"
          autoComplete="false"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Button type="primary" size="large" htmlType="submit">
        Log In
      </Button>
      <span className="forgot-password">Forgot Password?</span>
    </Form>
  );
}

export default LoginForm;
