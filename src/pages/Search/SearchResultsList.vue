<template>
  <div class="search-results">
    <SearchResultsTaxonomyGroup @apiSelected="apiSelected"
                                v-for="classification in getResults"
                                :key="classification.urn"
                                :classification="classification"/>
  </div>
</template>

<script>

import SearchResultsTaxonomyGroup from "@/pages/Search/SearchResultsTaxonomyGroup";
import SearchResultsTaxonomyGroupItem from "@/pages/Search/SearchResultsTaxonomyGroupItem";

export default {
  name: "SearchResultsList",
  components: {SearchResultsTaxonomyGroupItem, SearchResultsTaxonomyGroup},
  props: {
    result: Object
  },
  methods:{
    apiSelected(item) {
      this.$emit("apiSelected", item)
    }
  },
  computed: {
    getResults: function(){
     return Object.keys(this.$store.getters.results).map((key) => { return this.$store.getters.results[key] });
    }
  }
};

</script>