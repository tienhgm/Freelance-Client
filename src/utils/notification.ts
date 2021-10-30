import { notification } from 'antd';
export const notify = (type: any,message: any, description: any) => {
    
    // @ts-ignore
    notification[type]({
        message: message,
        description: description,
    });
};