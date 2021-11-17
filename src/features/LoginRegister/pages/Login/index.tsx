import { useAppDispatch, useAppSelector } from 'app/hooks';
import { login } from 'app/slices/authSlice';
import bgForm from 'assets/images/login.jpg';
import FormLogin from 'features/LoginRegister/components/FormLogin';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';

function Login() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  // const [isLogin, setIsLogin] = useState(false);
  // if (Object.entries(user).length > 0) {
  //   setIsLogin(true);
  // }
  const history = useHistory();
  const handleLogin = async (values: any) => {
    const { payload } = await dispatch(login(values));
    if (payload && !!payload.user) {
      history.push('/');
    }
  };
  const onFinish = (values: any) => {
    try {
      handleLogin(values);
    } catch (error) {}
  };

  return (
    <div className="login">
      <div className="flex items-center w-7/12 h-screen m-auto" style={{ minWidth: '600px' }}>
        <div
          className="flex w-full m-auto login__form h-3/4"
          style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px' }}
        >
          <div className="w-5/12 h-full rounded-l">
            <img src={bgForm} alt="login" className="w-auto h-full" />
          </div>
          <FormLogin onFormFinish={onFinish} />
        </div>
      </div>
    </div>
  );
}

export default Login;
