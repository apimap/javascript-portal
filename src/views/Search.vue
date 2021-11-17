<template>
  <div class="consumer-search-results">
    <ApiView :api="api"
               @hideApiView="hideApiView"
               @apiSelected="updateApiView"
               v-if="this.api !== undefined"/>
    <SearchLayout>
      <TaxonomyFilter class="element" />
      <div v-if="emptyFilters"><img :src="nothingSelectedError" alt="Nothing selected, nothing found"/></div>
      <SearchResults
          @apiSelected="updateApiView"
          :result="searchResult"
          v-if="selectedFilters"
      />
      <MetadataFilter class="element" />
    </SearchLayout>
  </div>
</template>

<script>
import TaxonomyFilter from "@/views/Filter/TaxonomyFilter";
import MetadataFilter from "@/views/Filter/MetadataFilter";

import SearchLayout from "@/components/Common/Layout/SearchLayout";
import SearchResults from "@/views/Search/SearchResults";
import ApiView from "@/views/Search/ApiView";
import {mapGetters, mapActions} from "vuex";

import nothingSelectedError from "@/assets/illustrations/nothing-found-illustration.svg";

export default {
  name: "ConsumerSearchResults",
  async mounted() {
    await this.loadSearchResource({rel: "classification:collection"});
    await this.search();
  },
  components: {
    SearchResults,
    MetadataFilter,
    TaxonomyFilter,
    SearchLayout,
    ApiView
  },
  methods:{
    hideApiView(){
      this.api = undefined;
    },
    updateApiView(api){
      this.api = api;
    },
    ...mapActions({
      loadSearchResult: "searchResult/loadBySelf",
      loadSearchResource: "searchResult/loadByRel"
    }),
    search(){
      this.loadSearchResult({
        filters: this.$store.getters.filters,
        resource: this.searchResource,
        includeParameters: false
      });
    }
  },
  data: function () {
    return {
      api: undefined,
      nothingSelectedError
    };
  },
  watch: {
    '$store.state.search.filters': function() {
      this.search()
    }
  },
  computed: {
    ...mapGetters({
      searchResult: "searchResult/all",
      searchResource: "searchResult/resource"
    }),
    emptyFilters: {
      get() {
        return this.$store.getters.filters.length <= 0;
      }
    },
    selectedFilters: {
      get() {
        return this.$store.getters.filters.length > 0;
      }
    },
  },
};
</script>

<style scoped>

.consumer-search-results{
  background-color: #0c1026;
  color: white;
  padding-bottom: 4em;
}

</style>
