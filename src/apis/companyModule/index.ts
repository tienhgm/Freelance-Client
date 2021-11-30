import { sendGet } from '../axios';
export const getCompany = (filters: any) => sendGet('companies', filters);
export const getDetailCompany = (id: any) => sendGet(`companies/${id}/detail`);
export const listJobManage = (id:any, filters?: any) => sendGet(`companies/${id}/jobs`,filters ? filters : '' )

