import bgForm from 'assets/images/register.jpg';
import FormRegister from 'features/LoginRegister/components/FormRegister';

function Register() {
  return (
    <div className="register">
      <div className="flex h-screen w-7/12 items-center m-auto" style={{ minWidth: '600px' }}>
        <div
          className="flex h-3/4 w-full"
          style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' }}
        >
          <div className="h-full w-5/12 rounded-l">
            <img src={bgForm} alt="login" className="h-full" />
          </div>
          <FormRegister />
        </div>
      </div>
    </div>
  );
}

export default Register;
