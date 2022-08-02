export const ADD_METADATA_FILTER = 'ADD_METADATA_FILTER';
export const REMOVE_METADATA_FILTER = 'REMOVE_METADATA_FILTER';
export const ADD_CLASSIFICATION_FILTER = 'ADD_CLASSIFICATION_FILTER';
export const REMOVE_CLASSIFICATION_FILTER = 'REMOVE_CLASSIFICATION_FILTER';
export const SELECT_TAXONOMY = 'SELECT_TAXONOMY';
export const DESELECT_TAXONOMY = 'DESELECT_TAXONOMY';
export const CLEAR_ALL_SELECTIONS = 'CLEAR_ALL_SELECTIONS';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const SET_RESULTS = 'SET_RESULTS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

export default {
    state: {
        filters: [],
        classifications: [],
        taxonomy: {},
        results: []
    },
    getters: {
        filters: state => {
            let returnValue = {};
            state.filters.forEach(f => {
                if(returnValue['filter' + f.key] === undefined){ returnValue['filter' + f.key] = f.value; }
                else{ returnValue['filter' + f.key] = returnValue['filter' + f.key] + "," + f.value; }
            })
            return returnValue;
        },
        classifications: state => {
            return state.classifications;
        },
        filterContainsMetadata: state => payload => {
            return state.filters.some(e => e['key'] === payload.key && e['value'] === payload.value);
        },
        filterContainsClassification: state => payload => {
            return state.filters.some(e => e['key'] === "[classification][" + state.taxonomy.nid + "]" && e['value'] === payload);
        },
        isSelectedTaxonomy: state => payload => {
            return state.taxonomy.nid === payload.nid;
        },
        results: state => {
            return state.results;
        }
    },
    mutations: {
        [CLEAR_FILTERS](state){
            state.filters = [];
        },
        [CLEAR_ALL_SELECTIONS](state){
            state.filters = [];
            state.results = [];
            state.classifications = [];
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
            state.filters.push({ key: "[classification][" + state.taxonomy.nid + "]", value: payload });
            state.classifications.push(payload);
        },
        [REMOVE_CLASSIFICATION_FILTER](state, payload) {
            // Payload: {urn: string}
            state.filters = state.filters.filter((e) => e.key === "[classification][" + state.taxonomy.nid + "]" && e.value !== payload );
            state.classifications = state.classifications.filter((e) => e !== payload );
        },
        [SELECT_TAXONOMY](state, payload) {
            // Payload: {taxonomy object}
            state.taxonomy = payload;
        },
        [DESELECT_TAXONOMY](state) {
            // Payload: none
            state.taxonomy = undefined;
        },
        [CLEAR_RESULTS](state){
            state.results = [];
        },
        [SET_RESULTS](state, payload) {

            // Payload: {taxonomy object}
            if(payload === undefined){
                state.results = [];
            }else{
                if ('_jv' in payload) { delete payload._jv; }
                state.results = payload;
            }
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
        },
        CLEAR_RESULTS({commit}){
            commit(CLEAR_RESULTS);
        },
        SET_RESULTS({commit}, payload){
            commit(SET_RESULTS, payload);
        },
        CLEAR_FILTERS({commit}){
            commit(CLEAR_FILTERS);
        }
    }
}