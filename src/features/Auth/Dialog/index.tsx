import { useState } from 'react';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import { Tabs } from 'antd';
import './style.scss';
import { notify } from 'utils/notification';
import { useAppDispatch } from 'app/hooks';
import { login, register } from 'app/slices/authSlice';
import { handleLoading } from 'app/slices/appSlice';
import Loading from 'components/Loading';

type DialogProps = {
  isOpen: boolean;
  isLogin: boolean;
  closeDialog: () => void;
};

const { TabPane } = Tabs;
const LOGIN_TAB_INDEX = '1';
const REGISTER_TAB_INDEX = '2';

function Dialog({ isOpen, isLogin, closeDialog }: DialogProps) {
  const [tabIndex, setTabIndex] = useState(() => (isLogin ? LOGIN_TAB_INDEX : REGISTER_TAB_INDEX));
  const [isReset, setIsReset] = useState(false);
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    try {
      // if(values.password == values.re_password){
      //   delete values.re_password
      // }
      tabIndex === REGISTER_TAB_INDEX ? await dispatch(register(values)) : await dispatch(login(values));
      closeDialog();
      setIsReset(true);
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo: any) => {
   
  };

  return (
    <>
      <Loading>
        {isOpen && (
          <>
            <div className="dialog__background" onClick={closeDialog}></div>
            <div className="dialog">
              <Tabs
                activeKey={tabIndex}
                onChange={(value) => {
                  setTabIndex(value);
                }}
                type="card"
                size="large"
              >
                <TabPane tab="Login" key={LOGIN_TAB_INDEX}>
                  <LoginForm
                    isReset={isReset}
                    onFormFinish={onFinish}
                    onFormFinishFalse={onFinishFailed}
                    openRegisterForm={() => setTabIndex(REGISTER_TAB_INDEX)}
                  />
                </TabPane>
                <TabPane tab="Register" key={REGISTER_TAB_INDEX}>
                  <RegisterForm isReset={isReset} onFormFinish={onFinish} onFormFinishFalse={onFinishFailed} />
                </TabPane>
              </Tabs>
            </div>
          </>
        )}
      </Loading>
    </>
  );
}

export default Dialog;
