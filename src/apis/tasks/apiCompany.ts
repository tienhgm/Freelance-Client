import { ApiCore } from "apis/utils/core";

class ApiCompany extends ApiCore {
  constructor() {
    super({
      get: true,
      post: true,
      put: true,
      remove: true,
      upload: true,
      getCustom: true
    });
  }
  getCompany(filters: any) {
    return this.getCustom(`companies`, filters)
  }
  getDetailCompany(id: any) {
    return this.getCustom(`companies/${id}/detail`)
  }
}

export default new ApiCompany();
