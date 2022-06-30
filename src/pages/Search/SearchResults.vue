<template>
  <CenterLayout width='80%'>
    <TheBreadcrumbs/>
    <div class="search-results">
      <Api v-show="api"
           @closeApi="closeCallback"
           :api="selectedApi"/>
      <SearchField class="element"/>
      <ResultLayout>
        <template v-slot:menu>
          <MetadataFilterMenu/>
        </template>
        <template v-slot:results>
          <TaxonomyFilterMenu class="element"/>
          <SearchResultsList @apiSelected="setApi"/>
        </template>
      </ResultLayout>
      <Footer/>
    </div>
  </CenterLayout>
</template>

<script>
import TaxonomyFilterMenu from "@/pages/Search/Elements/TaxonomyFilterMenu";
import MetadataFilterMenu from "@/pages/Search/Elements/MetadataFilterMenu";
import SearchResultsList from "@/pages/Search/SearchResultsList";
import SearchField from "@/components/Elements/SearchField";
import Api from "@/pages/Api/Api";
import {CenterLayout} from "@apimap/layout-core";
import TheBreadcrumbs from "@apimap/the-breadcrumbs";
import Footer from "@/components/Elements/Footer";

import ResultLayout from "@/components/Layout/ResultLayout";

import {LOAD_METADATA_OPTIONS, LOAD_SEARCH_OPTIONS} from "@/store/content/store";
import {CLEAR_ALL_SELECTIONS, CLEAR_RESULTS, SELECT_TAXONOMY, SET_RESULTS} from "@/store/search/store";
import {Paths} from "@/router/paths";

export default {
  name: "SearchResults",
  components: {
    SearchResultsList,
    MetadataFilterMenu,
    TaxonomyFilterMenu,
    ResultLayout,
    SearchField,
    CenterLayout,
    TheBreadcrumbs,
    Api,
    Footer
  },
  mounted() {
    this.api = this.$route.params.api;
  },
  methods:{
    setApi(api){
      this.api = api;
      const { href } = this.$router.resolve({ name: 'Search Results'});
      window.history.pushState({}, null, href + '/' + api.name );
    },
    closeCallback(){
      this.api = undefined;
      const { href } = this.$router.resolve({ name: 'Search Results'});
      window.history.pushState({}, null, href);
    }
  },
  data: function () {
    return {
      api: undefined
    };
  },
  watch: {
    '$store.state.search.filters': function(newValue, oldValue) {
      // TODO: Make this dynamic from returned urls
      if(newValue.length > 0) {
        this.$store.dispatch('jv/get', ["classification", {params: this.$store.getters.filters}]).then((data) => {
          this.$store.dispatch(SET_RESULTS, data);
        })
      }else{
        this.$store.dispatch(SET_RESULTS, {});
      }
    }
  },
  computed: {
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
    selectedApi: function(){
      if(this.api !== undefined) return this.api['name'];
      return this.$route.params.api;
    }
  }
};
</script>

<style scoped>

.search-results{
  padding-bottom: 4em;
}

.element{
  margin-bottom: 2em;
}

</style>
