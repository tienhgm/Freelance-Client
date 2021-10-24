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
}

export default new ApiAuth();
