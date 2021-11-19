import { ApiCore } from "apis/utils/core";

class ApiJob extends ApiCore {
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
  getJobs(filters?:any) {
    return this.getCustom('jobs', filters ? filters : '');
  }
  getDetailJob(id: any) {
    return this.getCustom(`jobs/${id}`)
  }
}

export default new ApiJob();
