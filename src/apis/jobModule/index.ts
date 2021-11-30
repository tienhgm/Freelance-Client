import { sendGet, sendPost } from '../axios';
export const getJobs = (filters?: any) => sendGet('jobs', filters ? filters : '');
export const getDetailJob = (id?: any) => sendGet(`jobs/${id}`);
export const postAJob = (job:any) => sendPost(`jobs`, job);
export const applyJob = (jobId: string, introduceMessage: any) => sendPost(`jobs/${jobId}/apply`, {introduceMessage});

