export default function getAuthHeader(): any {
  return JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).auth).accessToken;
}
