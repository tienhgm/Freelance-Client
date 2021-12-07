import { sendGet } from '../axios';
import axiosInstance from '../axios';
export const getCompany = (filters: any) => sendGet('companies', filters);
export const getDetailCompany = (id: any) => sendGet(`companies/${id}/detail`);
export const listJobManage = (id: any, filters?: any) => sendGet(`companies/${id}/jobs`, filters ? filters : '')
export const updateCompany = (companyId: string, data: any) => {
    let formData = new FormData();
    let config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    };
    
}