<template>
  <div class="search-results-taxonomy-group">
    <div class="paths">
      <div v-for="(element, index) in classification.path" :key="element.id" class="path">{{ element }}</div>
      <div class="content">
        <SearchResultsTaxonomyGroupItem @apiSelected="apiSelected"
                                        v-for="api in getApis"
                                        :key="api.id"
                                        :api="api"/>
      </div>
    </div>
  </div>
</template>

<script>

import SearchResultsTaxonomyGroupItem from "@/pages/Search/SearchResultsTaxonomyGroupItem";

export default {
  name: "SearchResultsTaxonomyGroup",
  components: {
    SearchResultsTaxonomyGroupItem
  },
  props: {
    classification: Object
  },
  methods:{
    apiSelected(api){
      this.$emit("apiSelected", api)
    }
  },
  computed:{
    getApis: function(){
      if(this.classification !== undefined
        && this.classification['metadata:collection'] !== undefined){
        return Object.keys(this.classification['metadata:collection']).map((key) => {
          return this.classification['metadata:collection'][key];
        });
      }
    }
  }
};

</script>

<style scoped>

.search-results-taxonomy-group{
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: min-content;
  text-align: left;
  border-left: 1px solid var(--box-border-color);
  margin-bottom: 2em;
}

.path:nth-last-child(1) {
  font-size: 2.2em;
  padding-top: 0.4em;
  padding-bottom: 0.6em;
}

.path:nth-last-child(2) {
  font-size: 1.8em;
  line-height: 1.6em;
  opacity: 0.9;
}

.path:nth-last-child(3) {
  font-size: 1.4em;
  line-height: 1.4em;
  opacity: 0.8;
}

.content {
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 1em;
  padding-top: 1em;
}

</style>