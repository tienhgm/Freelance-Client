import { sendGet } from '../axios';
export const getListFreelancer = (filters?:any) => sendGet('users',filters ? filters : '');
export const getDetailFreelancer = (id?: any) => sendGet(`users/${id}/profile`);

