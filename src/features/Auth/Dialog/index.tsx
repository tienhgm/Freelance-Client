import React from 'react';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import { Tabs } from 'antd';
import './style.scss';

type DialogProps = {
    isOpen: boolean,
    isLogin: boolean
}

const { TabPane } = Tabs

function Dialog({ isOpen, isLogin }: DialogProps) {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (<>
        {isOpen && <section className="dialog" >
            <Tabs defaultActiveKey={isLogin ? "1" : "2"} type="card" size="large">
                <TabPane tab="Login" key="1">
                    <LoginForm onFormFinish={onFinish} onFormFinishFalse={onFinishFailed} />
                </TabPane>
                <TabPane tab="Register" key="2">
                    <RegisterForm onFormFinish={onFinish} onFormFinishFalse={onFinishFailed} />
                </TabPane>
            </Tabs>
        </section>}
    </>
    );
}

export default Dialog;