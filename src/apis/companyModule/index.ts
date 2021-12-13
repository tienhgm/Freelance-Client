import { sendGet, sendPut, sendUpload,  sendUploadLogo } from '../axios';
import axiosInstance from '../axios';
export const getCompany = (filters: any) => sendGet('companies', filters);
export const updateCompany = (companyInfo: any, companyId: string) => sendPut('companies/'+companyId, companyInfo)
export const getDetailCompany = (id: any) => sendGet(`companies/${id}/detail`);
export const listJobManage = (id: any, filters?: any) => sendGet(`companies/${id}/jobs`, filters ? filters : '')
export const changeLogo = (file: any, companyId: any) => sendUploadLogo(`companies/${companyId}/logo`, file);