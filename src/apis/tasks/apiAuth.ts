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

  login(account: any) {
    return this.post(account, "account/login");
  }
}

export default new ApiAuth();
