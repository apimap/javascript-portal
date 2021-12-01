<template>
  <div class="taxonomy-filter">
    <div>
      <h3>TAXONOMY</h3>
      <div class="taxonomy">
        <div v-for="taxonomy in getTaxonomies" :key="taxonomy.nid">
           <Option :title="taxonomy.name"
                :description="taxonomy.description"
                :selected="$store.getters.isSelectedTaxonomy(taxonomy)"
                size="large"
                @toggleOption="selectTaxonomy"
                :option="taxonomy"/>
        </div>
      </div>
    </div>
    <div>
      <div class="classification-header">
        <h3>CLASSIFICATIONS</h3>
        <div class="clear button" @click.stop="clearAll">Clear all</div>
      </div>
      <div class="classification">
        <div v-for="classification in getTaxonomy" :key="classification.id">
          <Option :title="classification.title"
                  :description="classification.description"
                  :selected="$store.getters.filterContainsClassification(classification.urn)"
                  size="large"
                  @toggleOption="toggleClassification"
                  :option="classification"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  ADD_CLASSIFICATION_FILTER,
  CLEAR_FILTERS,
  REMOVE_CLASSIFICATION_FILTER,
  SELECT_TAXONOMY,
  UNSELECT_TAXONOMY
} from "@/store/search/store";
import { LOAD_METADATA_OPTIONS } from "@/store/content/store";

import Option from "@/components/Elements/Option";

export default {
  name: "TaxonomyFilter",
  components: {
    Option
  },
  mounted(){
    // TODO: Make this dynamic from returned urls
    this.$store.dispatch('jv/get', "taxonomy").then((data) => {
      if ('_jv' in data) {
        delete data._jv;
      }

      if(data !== undefined && Object.keys(data).length == 1){
        this.$store.dispatch(SELECT_TAXONOMY, data[Object.keys(data)[0]]);
      }
    })
  },
  methods: {
    clearAll: function (){
      this.$store.dispatch(CLEAR_FILTERS);
    },
    toggleClassification: function (object) {
      if (this.$store.getters.filterContainsClassification(object.urn)) {
        this.$store.dispatch(REMOVE_CLASSIFICATION_FILTER, object.urn);
      } else {
        this.$store.dispatch(ADD_CLASSIFICATION_FILTER, object.urn);
      }
    },
    selectTaxonomy: function(object){
      this.$store.dispatch(SELECT_TAXONOMY, object);
    }
  },
  computed: {
    getTaxonomy: function(){
      return Object.keys(this.$store.getters['jv/get']('urn:element'))
          .filter(key => this.$store.getters['jv/get']('urn:element')[key].title)
          .map(key => this.$store.getters['jv/get']('urn:element')[key]);
    },
    getTaxonomies: function(){
      return this.$store.getters['jv/get']('taxonomy:element');
    }
  },
  watch: {
    '$store.state.search.taxonomy': function(value) {
      this.$store.commit('jv/clearRecords', { _jv: { type: 'urn:element' } })
      // TODO: Make this dynamic from returned urls
      this.$store.dispatch('jv/get', "taxonomy/" + value.nid + '/version/latest/urn').then((data) => {})
    }
  }
};
</script>

<style scoped>

.classification-header{
  position: relative;
}

.clear {
  position: absolute;
  right: 0;
  top: -1em;
  font-weight: bold;
  font-size: 0.6em;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  border-radius: 0.2em;
  background-color: var(--button-dark-background-color);
  color: var(--button-dark-text-color);
  border: 1px solid var(--button-dark-border-color);
}

.taxonomy-filter {
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid var(--box-border-color);
  height: min-content;
  text-align: left;
  gap: 1em;
}

.classification {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.6em;
}

.taxonomy {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.6em;
}

</style>
