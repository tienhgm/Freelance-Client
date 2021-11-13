import { apiProvider } from "./provider";

export class ApiCore {
  get: Function = () => {};
  getById: Function = () => {};
  getCustom: Function = () => {};
  post: Function = () => {};
  put: Function = () => {};
  remove: Function = () => {};
  upload: Function = () => {};

  constructor(options: any) {
    if (options.get) {
      this.get = (filter: any, collection:any) => {
        return apiProvider.get(collection || options.collection, filter);
      };
    }
    if (options.getById) {
      this.getById = (id: any, collection:any) => {
        return apiProvider.getById(collection || options.collection, id);
      };
    }
    if (options.getCustom) {
      this.getCustom = (collection:any, filters:any) => {
        return apiProvider.getCustom(collection, filters);
      };
    }
    if (options.post) {
      this.post = (model: any, collection: any) => {
        return apiProvider.post(collection || options.collection, model);
      };
    }
    if (options.put) {
      this.put = (id: any, model: any, collection:any) => {
        return apiProvider.put(collection || options.collection, id, model);
      };
    }
    if (options.remove) {
      this.remove = (id: any) => {
        return apiProvider.remove(options.collection, id);
      };
    }
    if (options.upload) {
      this.upload = (files: File, collection:any) => {
        return apiProvider.upload(collection || options.collection, files);
      };
    }
  }
}
