import { ApiCore } from "apis/utils/core";

class ApiResources extends ApiCore {
    constructor() {
        super({
            get: true,
            post: true,
            put: true,
            remove: true,
        });
    }
    getSkills() {
        return this.get(null, "resources/languages")
    }
    getCities() {
        return this.get(null, "resources/nationnalities")
    }
}

export default new ApiResources();
