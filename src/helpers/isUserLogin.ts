export default function isLogin(): any {
    let isLogin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).user).curUser;
    return Object.entries(isLogin).length === 0 ? false : true;
}
