import { sendDelete, sendGet } from '../axios';
export const getJobs = (filters?: any) => sendGet('jobs', filters ? filters : '');
export const getDetailJob = (id?: any) => sendGet(`jobs/${id}`);
export const deleteJob = (id:any) => sendDelete(`jobs/${id}`);