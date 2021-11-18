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
  getJobs() {
    return this.get(null, 'jobs')
  }
  getDetailJob(id: any) {
    return this.getCustom(`jobs/${id}`)
  }
}

export default new ApiJob();
