import { apiProvider } from "./provider";

export class ApiCore {
  get: Function = () => {};
  getById: Function = () => {};
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
      this.getById = (id: number) => {
        return apiProvider.getById(options.collection, id);
      };
    }
    if (options.post) {
      this.post = (model: any, collection: any) => {
        return apiProvider.post(collection || options.collection, model);
      };
    }
    if (options.put) {
      this.put = (id: number, model: any, collection:any) => {
        return apiProvider.put(collection || options.collection, id, model);
      };
    }
    if (options.remove) {
      this.remove = (id: number) => {
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
