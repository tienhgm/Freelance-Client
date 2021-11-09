export function handleResponse(response: any) {
  if (response.data) {
    return {
      status: response.status,
      data: response.data.data,
    };
  }

  return response;
}

export function handleError(error: any) {
  if (error.response) {
    return Promise.reject(error.response)
  }
  return Promise.reject(error);
}
