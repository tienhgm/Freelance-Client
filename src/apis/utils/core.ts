import { apiProvider } from "./provider";

export class ApiCore {
  get: Function | null = null;
  getById: Function | null = null;
  post: Function | null = null;
  put: Function | null = null;
  remove: Function | null = null;
  upload: Function | null = null;

  constructor(options: any) {
    if (options.get) {
      this.get = (filter: any) => {
        return apiProvider.get(options.collection, filter);
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
      this.put = (id: number, model: any) => {
        return apiProvider.put(options.collection, id, model);
      };
    }
    if (options.remove) {
      this.remove = (id: number) => {
        return apiProvider.remove(options.collection, id);
      };
    }
    if (options.upload) {
      this.upload = (files: File) => {
        return apiProvider.upload(options.collection, files);
      };
    }
  }
}
