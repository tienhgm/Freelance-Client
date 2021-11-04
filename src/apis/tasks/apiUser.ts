import { ApiCore } from "apis/utils/core";

class ApiUser extends ApiCore {
  constructor() {
    super({
      get: true,
      post: true,
      put: true,
      remove: true,
      upload: true
    });
  }
  uploadAvt(file:any){
    return this.upload(file,"user/avatar");
  }

}

export default new ApiUser();
