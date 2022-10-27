<template>
  <div class="search-results">
    <div class="heading">
      <CenterLayout width='80%' class="heading-container">
        <div class="title">{{ title }} <a :href="developerPortalUrl"><img :src="addApiElement" alt="Add a new API to the catalog"/></a></div>
        <div class="center-item"></div>
        <SearchField class="search-field"/>
      </CenterLayout>
    </div>
    <CenterLayout width='80%'>
        <Api v-if="selectedApi"
             @closeApi="closeCallback"
             :api="selectedApi"/>
        <ResultLayout v-bind:class="[ api !== undefined ? 'noscroll' : '' ]">
          <template v-slot:menu>
            <TaxonomyFilterMenu class="element"/>
          </template>
          <template v-slot:results>
            <MetadataFilterMenu />
            <SearchResultsList @apiSelected="setApi"/>
            <img v-show="displayRefresh" :src="refreshResultsElement" alt="Refresh" class="refresh button" @click="search"/>
            <Footer/>
          </template>
        </ResultLayout>
    </CenterLayout>
  </div>
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
import addApiElement from "@/assets/elements/add-api-element.svg";
import refreshResultsElement from "@/assets/elements/refresh-results-element.svg";
import ResultLayout from "@/components/Layout/ResultLayout";
import {SET_RESULTS} from "@/store/search/store";

import OptionGroup from "@/components/Elements/OptionGroup";
import {LOAD_METADATA_OPTIONS} from "@/store/content/store";

export default {
  name: "SearchResults",
  components: {
    SearchResultsList,
    OptionGroup,
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
    this.$store.dispatch(LOAD_METADATA_OPTIONS);
  },
  methods:{
    setApi(api){
      this.api = api;
      this.$router.push({ name: 'Api', params: { api: this.api.name }});
    },
    closeCallback(){
      this.api = undefined;
      this.$router.push({name: 'Search Results'});
    },
    search(){
      this.$store.dispatch('jv/get', ["classification", {params: this.$store.getters.filters}]).then((data) => {
        this.$store.dispatch(SET_RESULTS, data);
      })
    }
  },
  data: function() {
    return {
      api: undefined,
      addApiElement,
      refreshResultsElement
    };
  },
  watch: {
    '$store.state.search.filters': function(newValue, oldValue) {
      // TODO: Make this dynamic from returned urls
      if(newValue.length > 0) {
        this.search();
      }else{
        this.$store.dispatch(SET_RESULTS, {});
      }
    }
  },
  computed: {
    displayRefresh: function(){
      return Object.keys(this.$store.getters.filters).length > 0;
    },
    title: function(){
      return APIMAP_TITLE;
    },
    developerPortalUrl: function(){
      return APIMAP_DEVELOPER_URL;
    },
    emptyFilters:{
      get() {
        return Object.keys(this.$store.getters.filters).length <= 0;
      }
    },
    selectedFilters:{
      get() {
        return Object.keys(this.$store.getters.filters).length > 0;
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

.search-field{
  margin-right: 2em;
  width: auto;
}

img{
  vertical-align: middle;
}

.refresh {
  transition: transform 1.2s ease-in-out;
}

.refresh:hover {
  transform: rotate(-360deg);
}

.title{
  width: 16em;
  text-align: left;
  line-height: 1.3em;
  font-size: 1.6em;
  color: #5c5470;
  overflow: clip;
  white-space: nowrap;
}

.center-item{
  flex-grow: 1;
}

.heading-container{
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: stretch;
}

.heading{
  width: 100%;
  height: 44px;
  border-bottom: 1px solid var(--box-border-color);
  background-color: white;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  padding-top: 10px;
  margin-right: 2em;
  z-index: 10;
}

</style>
