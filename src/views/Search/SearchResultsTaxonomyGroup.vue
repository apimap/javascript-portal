<template>
  <div class="search-results-taxonomy-group">
    <div class="paths">
      <div v-for="(title, index) in group.attributes.path" :key="title" class="path">{{title}}</div>
    </div>
    <SearchResultsTaxonomyGroupItem @apiSelected="apiSelected"
                                    v-for="api in apis"
                                    :key="api.id"
                                    :api="api"/>
  </div>
</template>

<script>

import SearchResultsTaxonomyGroupItem from "@/views/Search/SearchResultsTaxonomyGroupItem";
import {mapGetters} from "vuex";

export default {
  name: "SearchResultsTaxonomyGroup",
  components: {
    SearchResultsTaxonomyGroupItem
  },
  props: {
    group: Object
  },
  methods:{
    apiSelected(api) {
      this.$emit("apiSelected", api)
    }
  },
  computed:{
    apis: {
      get() {
        return this.included.filter(
            api => this.group.relationships['metadata:collection']['data'].some(e => e.id === api.id)
        )
      }
    },
    ...mapGetters({
      included: "metadata:element/all"
    }),
  }
};

</script>

<style scoped>

.search-results-taxonomy-group{
  padding: 1em;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: min-content;
  text-align: left;
  border-left: 1px solid #184e77;
  margin-bottom: 2em;
}

.path:nth-last-child(1) {
  font-size: 2em;
  padding-top: 0.4em;
  padding-bottom: 0.6em;
}

.path:nth-last-child(2) {
  font-size: 1.4em;
  line-height: 1.6em;
  color: #2984c9;
}

.path:nth-last-child(3) {
  font-size: 1.2em;
  line-height: 1.4em;
  color: #2371ad;
}

</style>