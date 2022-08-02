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
        <Api v-show="api"
             @closeApi="closeCallback"
             :api="selectedApi"/>
        <ResultLayout v-bind:class="[ api !== undefined ? 'noscroll' : '' ]">
          <template v-slot:menu>
            <TaxonomyFilterMenu class="element"/>
          </template>
          <template v-slot:results>
            <MetadataFilterMenu/>
            <SearchResultsList @apiSelected="setApi"/>
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
import ResultLayout from "@/components/Layout/ResultLayout";

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
      api: undefined,
      addApiElement
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
    title () {
      return APIMAP_TITLE;
    },
    developerPortalUrl() {
      return APIMAP_DEVELOPER_URL;
    },
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

.search-field{
  margin-right: 2em;
  width: auto;
}

img{
  vertical-align: middle;
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
