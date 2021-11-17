import { mapResourceModules } from "@reststate/vuex";

import api from "../client.js";

export default {
    modules: {
        ...mapResourceModules({
            names: ["taxonomies", "classification"],
            httpClient: api,
        }),
    },
}