import axios from "axios";

export const ADD_METADATA_OPTIONS = 'ADD_METADATA_OPTIONS';
export const REMOVE_METADATA_OPTIONS = 'REMOVE_METADATA_OPTIONS';
export const LOAD_METADATA_OPTIONS = 'LOAD_METADATA_OPTIONS';
export const LOAD_SEARCH_OPTIONS = 'LOAD_SEARCH_OPTIONS';
export const ADD_SEARCH_OPTIONS = 'ADD_SEARCH_OPTIONS';

export default {
    state: {
        metadataOptions: {},
        searchOptions: []
    },
    getters: {
        metadataOptions: state => {
            return state.metadataOptions;
        },
        searchOptions: state => {
            return state.searchOptions;
        }
    },
    mutations: {
        [REMOVE_METADATA_OPTIONS](state) {
            state.metadataOptions = {};
        },
        [ADD_METADATA_OPTIONS](state, payload) {
            // Payload:
            state.metadataOptions = payload;
        },
        [ADD_SEARCH_OPTIONS](state, payload) {
            // Payload:
            state.searchOptions = payload;
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
        LOAD_SEARCH_OPTIONS({commit}){
            axios
                .get('/content/search-options.json', {})
                .then(response => response.data)
                .then(content => {
                    commit(ADD_SEARCH_OPTIONS, content)
                })
        },
        ADD_SEARCH_OPTIONS({commit}, payload){
            commit(ADD_METADATA_OPTIONS, payload);
        },
    },
}