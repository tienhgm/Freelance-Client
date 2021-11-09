import { useState } from 'react';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import { Tabs } from 'antd';
import './style.scss';
import { useAppDispatch } from 'app/hooks';
import { login, register } from 'app/slices/authSlice';

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
  const dispatch = useAppDispatch();
  const newDispatch = (values: any) => {
    if (tabIndex === REGISTER_TAB_INDEX) {
      dispatch(register(values));
    } else {
      dispatch(login(values));
    }
  };
  const onFinish = async(values: any) => {
    try {
      await newDispatch(values);
    } catch (error) {}
  };

  return (
    <>
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
                <LoginForm onFormFinish={onFinish} openRegisterForm={() => setTabIndex(REGISTER_TAB_INDEX)} />
              </TabPane>
              <TabPane tab="Register" key={REGISTER_TAB_INDEX}>
                <RegisterForm onFormFinish={onFinish} />
              </TabPane>
            </Tabs>
          </div>
        </>
      )}
    </>
  );
}

export default Dialog;
