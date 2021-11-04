export default function getAuthHeader(): any {
  const token = localStorage.getItem("persist:root")
    ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).auth).accessToken
    : "";
  return token ? { Authorization: "Bearer " + token } : {};
}
