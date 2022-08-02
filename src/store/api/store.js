import client from "@/clients/rest-client.js";

import { jsonapiModule } from 'jsonapi-vuex'

const config = {
    recurseRelationships: true,
    preserveJson: true
}

export default {
    modules: {
        jv: jsonapiModule(client, config),
    },
}