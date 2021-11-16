import bgForm from 'assets/images/login.jpg';
import FormLogin from 'features/LoginRegister/components/FormLogin';

function Login() {
  return (
    <div className="login">
      <div className="flex h-screen w-7/12 items-center m-auto" style={{ minWidth: '600px' }}>
        <div
          className="login__form flex h-3/4 w-full m-auto"
          style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' }}
        >
          <div className="h-full w-5/12 rounded-l">
            <img src={bgForm} alt="login" className="h-full w-auto" />
          </div>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}

export default Login;
