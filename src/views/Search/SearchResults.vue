<template>
  <div class="search-results">
    <SearchResultsTaxonomyGroup @apiSelected="apiSelected"
                                v-for="group in result"
                                :key="group.id"
                                :group="group"/>
  </div>
</template>

<script>

import SearchResultsTaxonomyGroup from "@/views/Search/SearchResultsTaxonomyGroup";
import SearchResultsTaxonomyGroupItem from "@/views/Search/SearchResultsTaxonomyGroupItem";

export default {
  name: "SearchResults",
  components: {SearchResultsTaxonomyGroupItem, SearchResultsTaxonomyGroup},
  props: {
    result: Array
  },
  methods:{
    apiSelected(item) {
      this.$emit("apiSelected", item)
    }
  }
};

</script>