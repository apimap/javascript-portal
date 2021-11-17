import axios from "axios";

export const ADD_METADATA_OPTIONS = 'ADD_METADATA_OPTIONS';
export const REMOVE_METADATA_OPTIONS = 'REMOVE_METADATA_OPTIONS';
export const LOAD_METADATA_OPTIONS = 'LOAD_METADATA_OPTIONS';

export default {
    state: {
        metadataOptions: {}
    },
    getters: {
        metadataOptions: state => {
            return state.metadataOptions;
        }
    },
    mutations: {
        [REMOVE_METADATA_OPTIONS](state) {
            state.metadataOptions = {};
        },
        [ADD_METADATA_OPTIONS](state, payload) {
            // Payload:
            state.metadataOptions = payload;
        }
    },
    actions: {
        LOAD_METADATA_OPTIONS({commit}){
            axios
                .get('/content/metadata-options.json', {})
                .then(response => response.data)
                .then(content => {
                    commit(ADD_METADATA_OPTIONS, content)
                })
        },
        ADD_METADATA_OPTIONS({commit}, payload){
            commit(ADD_METADATA_OPTIONS, payload);
        },
        REMOVE_METADATA_OPTIONS({commit}){
            commit(REMOVE_METADATA_OPTIONS);
        },
    },
}