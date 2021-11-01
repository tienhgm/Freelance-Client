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
  activate = (account: any) => {
    return this.put(null, {token: account}, "account/activate")
  }
}

export default new ApiAuth();
