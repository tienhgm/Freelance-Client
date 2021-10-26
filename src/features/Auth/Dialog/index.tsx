import React, { useState } from "react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import { Tabs } from "antd";
import "./style.scss";
import apiAuth from "apis/tasks/apiAuth";

type DialogProps = {
    isOpen: boolean;
    isLogin: boolean;
    closeDialog: () => void;
};

const { TabPane } = Tabs;
const LOGIN_TAB_INDEX = "1";
const REGISTER_TAB_INDEX = "2";

function Dialog({ isOpen, isLogin, closeDialog }: DialogProps) {
    const onFinish = async (values: any) => {
        const res = await apiAuth.login({
            "email": "thienkhac8@gmail.com",
            "password": "thienkhac8"
        });
        console.log(res);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const [tabIndex, setTabIndex] = useState(() => isLogin ? LOGIN_TAB_INDEX : REGISTER_TAB_INDEX)

    return (
        <>
            {isOpen && (
                <>
                    <div className="dialog__background" onClick={closeDialog}></div>
                    <div className="dialog">
                        <Tabs
                            activeKey={tabIndex}
                            onChange={(value) => { setTabIndex(value) }}
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
        </>
    );
}

export default Dialog;
