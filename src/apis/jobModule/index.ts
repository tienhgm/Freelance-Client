import { sendGet, sendPost, sendDelete, sendPut } from '../axios';
export const getJobs = (filters?: any) => sendGet('jobs', filters ? filters : '');
export const getJobCandidates = (id: string, filters?: any) => sendGet(`jobs/${id}/candidates`, filters ? filters : '');
export const getJobEmployees = (id: string, filters?: any) => sendGet(`jobs/${id}/employees`, filters ? filters : '');
export const getDetailJob = (id?: any) => sendGet(`jobs/${id}`);
export const postAJob = (job: any) => sendPost(`jobs`, job);
export const updateJob = (id: string, job: any) => sendPut(`jobs/${id}`, job);
export const deleteJob = (id: any) => sendDelete(`jobs/${id}`);
export const applyJob = (jobId: string, introduceMessage: any) => sendPost(`jobs/${jobId}/apply`, { introduceMessage });
export const changeApplyStatus = (jobId: any, candidateId: any, applyStatus: string, rejectMessage?: string) => sendPut(`jobs/${jobId}/candidates/${applyStatus}/${candidateId}`, rejectMessage ? { rejectMessage } : '');
export const deleteEmployeeFromJob = (jobId: any, employeeId: any) => sendDelete(`jobs/${jobId}/employees/${employeeId}`);
export const postAReview = (userId: string, jobId: string, review: any) => sendPost(`reviews/fromCompany/${jobId}/${userId}`, review);
export const postAReviewByUser = (jobId: string, review: any) => sendPost(`reviews/fromUser/${jobId}`, review);
export const finishJob = (jobId: string) => sendPut(`jobs/${jobId}/finish`);
export const completedJobByUser = (jobId: string) => sendPost(`jobs/${jobId}/completedByUser`);
export const getReviewFromCompanyOrUser = (userId: string, jobId: string, type: string) => sendGet(`reviews/jobs/${jobId}/${type}/${userId}`);
export const leaveThisJobWhenAwait = (jobId: string) => sendDelete(`jobs/${jobId}/removeApplication`)
