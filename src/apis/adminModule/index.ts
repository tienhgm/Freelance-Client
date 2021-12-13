import { sendDelete, sendGet } from '../axios';
export const getJobs = (filters?: any) => sendGet('jobs', filters ? filters : '');
export const getDetailJob = (id?: any) => sendGet(`jobs/${id}`);
export const deleteJob = (id:any) => sendDelete(`jobs/${id}`);
export const getAdmin = (role: any, filters?: any) => sendGet(`admin/${role}/users`, filters ? filters : '');
export const getCompany = (role: any, filters?: any) => sendGet(`admin/${role}/users`, filters ? filters : '');
export const getFreelancer = (role: any, filters?: any) => sendGet(`admin/${role}/users`, filters ? filters : '');