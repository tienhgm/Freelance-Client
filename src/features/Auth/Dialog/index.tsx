import { useState } from "react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import { Tabs } from "antd";
import "./style.scss";
import apiAuth from "apis/tasks/apiAuth";
import { notify } from "utils/notification";
import { useAppDispatch } from "app/hooks";
import { login } from "app/slices/authSlice";
import LoadingComp from "components/Loading";

type DialogProps = {
  isOpen: boolean;
  isLogin: boolean;
  closeDialog: () => void;
};

const { TabPane } = Tabs;
const LOGIN_TAB_INDEX = "1";
const REGISTER_TAB_INDEX = "2";

function Dialog({ isOpen, isLogin, closeDialog }: DialogProps) {
  const [tabIndex, setTabIndex] = useState(() =>
    isLogin ? LOGIN_TAB_INDEX : REGISTER_TAB_INDEX
  );
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    let action =
      tabIndex === REGISTER_TAB_INDEX ? apiAuth.register : apiAuth.login;
    try {
      const res = await action({
        ...values,
      });
      if (res.status === 200) {
        // dispatch(login(res.data));
        notify("success", "Success", "");
        // closeDialog();
      }
    } catch (error) {
    } finally {
    }
  };
  const onFinishFailed = (errorInfo: any) => {};

  return (
    <>
      <LoadingComp>
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
                    onFormFinish={onFinish}
                    onFormFinishFalse={onFinishFailed}
                    openRegisterForm={() => setTabIndex(REGISTER_TAB_INDEX)}
                  />
                </TabPane>
                <TabPane tab="Register" key={REGISTER_TAB_INDEX}>
                  <RegisterForm
                    onFormFinish={onFinish}
                    onFormFinishFalse={onFinishFailed}
                  />
                </TabPane>
              </Tabs>
            </div>
          </>
        )}
      </LoadingComp>
    </>
  );
}

export default Dialog;
