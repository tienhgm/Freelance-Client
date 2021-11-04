import { ApiCore } from "apis/utils/core";

class ApiAuth extends ApiCore {
  constructor() {
    super({
      get: true,
      post: true,
      put: true,
      remove: true,
    });
  }
  login = (account: any) => {
    return this.post(account, "account/login");
  }
  register = (account: any) => {
    return this.post(account, "account/register");
  }
  activate = (token: any) => {
    return this.put(null, {token: token}, "account/activate")
  }
  changePassword = (password: any) => {
    return this.put(null, password, "user/change-password")
  }
}

export default new ApiAuth();
