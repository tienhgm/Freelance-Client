import Axios from 'axios';
import getAuthHeader from 'utils/getAuthHeader';
import configs from '../config';
const axiosInstance = Axios.create({
    timeout: 3 * 60 * 1000,
    baseURL: configs.BASE_URL
});
axiosInstance.interceptors.request.use(
    (config) => {
        // @ts-ignore
        config.headers.Authorization = getAuthHeader();
        return config;
    },
    (error) => Promise.reject(error)
);
const logout = () => {
    // localStorage.setItem('logout-event', 'logout' + Math.random());
    alert('Token expired');
    localStorage.isExpired = true;
    window.location.href = "/";
    // window.location.reload();
}
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            if (!!!getAuthHeader()) {
                return Promise.reject(error.response);
            } else {
                return logout();
            }
        }
        else {
            return Promise.reject(error.response);
        }
        // const refreshToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).auth).refreshToken;
        // if (!refreshToken) {
        //     return logout();
        // }
    }
);
export default axiosInstance;
export const sendGet = (url: string, params?: any) => axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
    axiosInstance.post(url, params, { params: queryParams }).then((res) => res.data);
export const sendPut = (url: string, params?: any) => axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) => axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) => axiosInstance.delete(url, { params }).then((res) => res.data);
export const sendUpload = (url: string, file: any) => {
    let formData = new FormData();
    formData.append("file", file);
    return axiosInstance.put(url, formData).then((res) => res.data);
}
