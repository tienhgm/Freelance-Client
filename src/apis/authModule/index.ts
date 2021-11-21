import { sendPost, sendPut } from '../axios';
export const handleLogin = (account: any) => sendPost('account/login', account);
export const handleRegister = (account: any) => sendPost('account/register', account);
export const handleActivate = (token: any) => sendPut('account/activate', { token: token });