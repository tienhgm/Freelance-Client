import axios from "axios";
import baseUrl from "./apiConfig";
import getAuthHeader from "utils/getAuthHeader";
import getQueryString from "utils/queryString";
import { handleError, handleResponse } from "./response";

const get = (collection: any, filters = {}) => {
  const queryString = getQueryString(filters);
  return axios
    .get(`${baseUrl}/${collection}?${queryString}`, {
      headers: getAuthHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
};

const getById = (collection: any, id: number) => {
  return axios
    .get(`${baseUrl}/${collection}/${id}`, {
      headers: getAuthHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
};

const post = (collection: any, model: any) => {
  return axios
    .post(`${baseUrl}/${collection}`, model, { headers: getAuthHeader() })
    .then(handleResponse)
    .catch(handleError);
};

const put = (collection: any, id: number, model: any) => {
  return axios
    .put(`${baseUrl}/${collection}/${id}`, model, { headers: getAuthHeader() })
    .then(handleResponse)
    .catch(handleError);
};

const remove = (collection: any, id: number) => {
  return axios
    .delete(`${baseUrl}/${collection}/${id}`, { headers: getAuthHeader() })
    .then(handleResponse)
    .catch(handleError);
};

const upload = (collection: any, files: any) => {
  let formData = new FormData();
  for (let index = 0; index < files.length; index++) {
    formData.append(collection, files[index]);
  }
  return axios
    .post(`${baseUrl}/${collection}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    })
    .then(handleResponse)
    .catch(handleError);
};

export const apiProvider = { get, getById, post, put, remove, upload };
