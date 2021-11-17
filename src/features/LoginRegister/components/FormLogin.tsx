import { Form, Button, Input } from 'antd';
import { REGEX_CHECK_EMAIL } from 'constants/regex';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { useHistory } from 'react-router';
type LoginFormProps = {
  onFormFinish: (values: any) => void;
};
function FormLogin({ onFormFinish }: LoginFormProps) {
  const [form] = Form.useForm();
  const history = useHistory();
  const goToHome = () => {
    history.push('/')
  };
  const goToRegister = () => {
    history.push('/register')
  };
  return (
    <div className="flex-1 bg-white form-login">
      <Form form={form} name="login" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFormFinish}>
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
        <span className="mt-3">
          Don't have an account?{' '}
          <span onClick={goToRegister} className="form-title__sign-up">
            Sign Up!
          </span>
        </span>
        <span>
          <span onClick={goToHome} className="form-title__sign-up">
            Home
          </span>
        </span>
      </Form>
    </div>
  );
}

export default FormLogin;
