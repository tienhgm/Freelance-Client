export default function getAuthHeader(): any {
  let accessToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).auth).accessToken
  return accessToken ? 'Bearer ' + accessToken : '';
}
