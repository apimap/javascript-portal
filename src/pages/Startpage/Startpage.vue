<template>
  <CenterLayout width='60em'>
      <CenterLayout style="height:100%">
        <SearchField class="search-field"/>
        <h2>Browse by Taxonomy</h2>
        <TaxonomyFilter class="element" />
        <MetadataFilter class="element" />
        <div class="action-button button" @click="search">BROWSE</div>
      </CenterLayout>
      <Footer/>
  </CenterLayout>
</template>

<script>
import TaxonomyFilter from "@/pages/Startpage/Elements/TaxonomyFilter";
import MetadataFilter from "@/pages/Startpage/Elements/MetadataFilter";
import Footer from "@/components/Elements/Footer";

import {CenterLayout} from "@apimap/layout-core";

import {CLEAR_RESULTS, SET_RESULTS} from "@/store/search/store";
import {Paths} from "@/router/paths";
import SearchField from "@/components/Elements/SearchField";

export default {
  name: "Startpage",
  components: {
    SearchField,
    MetadataFilter,
    TaxonomyFilter,
    CenterLayout,
    Footer
  },
  watch: {
    '$store.state.search.results': function() {
      this.$router.push({ name: Paths.search.name });
    }
  },
  methods: {
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

.element {
  margin-bottom: 3em;
  user-select: none;
}

.search-field {
  padding-top: 2em;
  padding-bottom: 4em;
}

</style>
