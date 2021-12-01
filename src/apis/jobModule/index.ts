import { sendGet, sendPost, sendDelete } from '../axios';
export const getJobs = (filters?: any) => sendGet('jobs', filters ? filters : '');
export const getDetailJob = (id?: any) => sendGet(`jobs/${id}`);
export const postAJob = (job:any) => sendPost(`jobs`, job);
export const deleteJob = (id:any) => sendDelete(`jobs/${id}`);
export const applyJob = (jobId: string, introduceMessage: any) => sendPost(`jobs/${jobId}/apply`, {introduceMessage});

