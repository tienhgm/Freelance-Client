import { useAppDispatch } from 'app/hooks';
import { register } from 'app/slices/authSlice';
import bgForm from 'assets/images/register.jpg';
import FormRegister from 'features/LoginRegister/components/FormRegister';
import { useHistory } from 'react-router-dom';

function Register() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleLogin = async (values: any) => {
    const { payload } = await dispatch(register(values));
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
    <div className="register">
      <div className="flex items-center w-7/12 h-screen m-auto" style={{ minWidth: '800px' }}>
        <div
          className="flex w-full h-3/4"
          style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px' }}
        >
          <div className="w-5/12 h-full rounded-l">
            <img src={bgForm} alt="register" className="h-full" />
          </div>
          <FormRegister onFormFinish={onFinish} />
        </div>
      </div>
    </div>
  );
}

export default Register;
