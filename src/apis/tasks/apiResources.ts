import { ApiCore } from "apis/utils/core";

class ApiResources extends ApiCore {
    constructor() {
        super({
            get: true,
            post: true,
            put: true,
            remove: true,
            getCustom: true
        });
    }
    getSkills() {
        return this.get(null, "resources/languages")
    }
    getArea() {
        return this.getCustom(`resources/areas`, {countryId: 240})
    }
    getLanguages() {
        return this.get(null, "resources/languages")
    }
    getCountries() {
        return this.get(null, "resources/countries")
    }
}

export default new ApiResources();
