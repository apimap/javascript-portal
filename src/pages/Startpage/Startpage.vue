<template>
  <CenterLayout width='60em'>
    <TheBreadcrumbs/>
    <div class="startpage">
      <CenterLayout style="height:100%">
        <SearchField class="search-field"/>
        <h2>Browse by Taxonomy</h2>
        <TaxonomyFilter class="element" />
        <MetadataFilter class="element" />
        <div class="search-button button" @click="search">BROWSE</div>
      </CenterLayout>
      <Footer/>
    </div>
  </CenterLayout>
</template>

<script>
import TaxonomyFilter from "@/pages/Startpage/Elements/TaxonomyFilter";
import MetadataFilter from "@/pages/Startpage/Elements/MetadataFilter";
import Footer from "@/components/Elements/Footer";

import {CenterLayout, VerticalStackLayout} from "@apimap/layout-core";

import {CLEAR_RESULTS, CLEAR_ALL_SELECTIONS, SELECT_TAXONOMY, SET_RESULTS} from "@/store/search/store";
import {Paths} from "@/router/paths";
import SearchField from "@/components/Elements/SearchField";
import TheBreadcrumbs from "@apimap/the-breadcrumbs";

export default {
  name: "Startpage",
  components: {
    SearchField,
    MetadataFilter,
    TaxonomyFilter,
    CenterLayout,
    VerticalStackLayout,
    Footer,
    TheBreadcrumbs
  },
  watch: {
    '$store.state.search.results': function() {
      this.$router.push({ name: Paths.search.name });
    }
  },
  methods: {
    redirectToProducer: function(){
      window.location.href = APIMAP_DEVELOPER_URL
    },
    search: function(){
      this.$store.dispatch(CLEAR_RESULTS);

      // TODO: Make this dynamic from returned urls
      this.$store.dispatch('jv/get', [ "classification", { params: this.$store.getters.filters }]).then((data) => {
        this.$store.dispatch(SET_RESULTS, data);
      })
    }
  }
};
</script>

<style scoped>

.search-button {
  border: 2px solid var(--search-button-border-color);
  background-color: var(--search-button-background-color);
  color: var(--search-button-text-color);
  font-size: 1.2em;
  padding-top: 1em;
  width: 20em;
  padding-bottom: 1em;
  margin: auto;
  user-select: none;
}

.search-button:hover {
  background-color: var(--search-button-selected-background-color);
  color: var(--search-button-selected-text-color);
}

.element {
  margin-bottom: 3em;
  user-select: none;
}

.search-field {
  padding-top: 4em;
  padding-bottom: 8em;
}

</style>
