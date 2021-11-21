import { sendGet } from '../axios';
export const getCompany = (filters: any) => sendGet('companies', filters);
export const getDetailCompany = (id: any) => sendGet(`companies/${id}/detail`);

