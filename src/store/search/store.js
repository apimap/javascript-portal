import {mapResourceModules} from "@reststate/vuex";

export const ADD_METADATA_FILTER = 'ADD_METADATA_FILTER';
export const REMOVE_METADATA_FILTER = 'REMOVE_METADATA_FILTER';
export const ADD_CLASSIFICATION_FILTER = 'ADD_CLASSIFICATION_FILTER';
export const REMOVE_CLASSIFICATION_FILTER = 'REMOVE_CLASSIFICATION_FILTER';
export const SELECT_TAXONOMY = 'SELECT_TAXONOMY';
export const DESELECT_TAXONOMY = 'DESELECT_TAXONOMY';
export const CLEAR_ALL_SELECTIONS = 'CLEAR_ALL_SELECTIONS';

import api from "../client.js";

export default {
    state: {
        filters: [],
        taxonomy: {},
        results: []
    },
    getters: {
        filters: state => {
            return state.filters;
        },
        filterContainsMetadata: state => payload => {
            return state.filters.some(e => e['key'] === payload.key && e['value'] === payload.value);
        },
        filterContainsClassification: state => payload => {
            return state.filters.some(e => e['key'] === "[classification][" + state.taxonomy.attributes.nid + "]" && e['value'] === payload);
        },
        isSelectedTaxonomy: state => payload => {
            return state.taxonomy.id === payload.id;
        }
    },
    mutations: {
        [CLEAR_ALL_SELECTIONS](state, payload){
            state.filters = [];
            state.results = [];
        },
        [ADD_METADATA_FILTER](state, payload) {
            // Payload: {key: string, value: string}
            state.filters.push({ key: payload.key, value: payload.value });
        },
        [REMOVE_METADATA_FILTER](state, payload) {
            // Payload: {key: string, value: string}
            state.filters.splice(state.filters.findIndex( (e) => e.key === payload.key && e.value === payload.value ), 1);
        },
        [ADD_CLASSIFICATION_FILTER](state, payload) {
            // Payload: {urn: string}
            state.filters.push({ key: "[classification][" + state.taxonomy.attributes.nid + "]", value: payload });
        },
        [REMOVE_CLASSIFICATION_FILTER](state, payload) {
            // Payload: {urn: string}
            state.filters.splice(state.filters.findIndex( (e) => e.key === "[classification][" + state.taxonomy.attributes.nid + "]" && e.value === payload ), 1);
        },
        [SELECT_TAXONOMY](state, payload) {
            // Payload: {taxonomy object}
            state.taxonomy = payload;
        },
        [DESELECT_TAXONOMY](state) {
            // Payload: none
            state.taxonomy = undefined;
        },
    },
    actions: {
        ADD_METADATA_FILTER({commit}, payload){
            commit(ADD_METADATA_FILTER, payload);
        },
        REMOVE_METADATA_FILTER({commit}, payload){
            commit(REMOVE_METADATA_FILTER, payload);
        },
        ADD_CLASSIFICATION_FILTER({commit}, payload){
            commit(ADD_CLASSIFICATION_FILTER, payload);
        },
        REMOVE_CLASSIFICATION_FILTER({commit}, payload){
            commit(REMOVE_CLASSIFICATION_FILTER, payload);
        },
        SELECT_TAXONOMY({commit}, payload){
            commit(SELECT_TAXONOMY, payload);
        },
        DESELECT_TAXONOMY({commit}){
            commit(DESELECT_TAXONOMY);
        },
        CLEAR_ALL_SELECTIONS({commit}){
            commit(CLEAR_ALL_SELECTIONS);
        }
    },
    modules: {
        ...mapResourceModules({
            names: ["apiVersionMetadata", "searchResult", "metadata:element", "taxonomyClassifications", "version:collection", "version:element"],
            httpClient: api,
        }),
    },
}