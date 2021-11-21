import { sendGet, sendUpload, sendPut } from '../axios';
export const changePassword = (password: any) => sendPut('user/change-password', password);
export const getProfile = (id: any) => sendGet(`users/${id}/cv`);
export const updateProfile = (data: any) => sendPut('user/cv', data);
export const getReviewsById = (id: any, filters: any) => sendGet(`users/${id}/reviewsByUser`, filters);
export const getReviewsByUser = (id: any, filters: any) => sendGet(`users/${id}/reviewsByUser`, filters);
export const handleUploadAvt = (file:any) => sendUpload(`user/avatar`, file);