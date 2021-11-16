import { ApiCore } from "apis/utils/core";

class ApiUser extends ApiCore {
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
  uploadAvt(file: any) {
    return this.upload(file, "user/avatar");
  }
  changePassword = (password: any) => {
    return this.put(null, password, "user/change-password")
  }
  getProfile(id: any) {
    return this.getCustom(`users/${id}/cv`, null)
  }
  updateProfile(data: any) {
    return this.put(null, data, "user/cv")
  }
  // getReviews(filters:any) {
  //   return this.get(filters, "user/reviews")
  // }
  getReviewsById(id: any, filters: any) {
    return this.getCustom(`users/${id}/reviews`, filters)
  }
  getReviewsByUser(id: any, filters: any){
    return this.getCustom(`users/${id}/reviewsByUser`, filters)
  }
}

export default new ApiUser();
