<template>
  <div class="taxonomy-filter">
    <div v-if="displayTaxonomies">
      <div class="classification-header">
        <h3>TAXONOMY</h3>
      </div>
      <div class="taxonomy" :style="layoutStyle">
        <div v-for="taxonomy in getTaxonomies" :key="taxonomy.nid">
           <Option :title="taxonomy.name"
                :description="taxonomy.description"
                :selected="$store.getters.isSelectedTaxonomy(taxonomy)"
                @toggleOption="selectTaxonomy"
                :option="taxonomy"/>
        </div>
      </div>
    </div>
    <div class="taxonomy-content">
      <div class="classifications">
        <div>
          <h3 @click.stop="viewLevel0">Classifications</h3>
        </div>
        <Transition name="l0">
          <div class="options" v-if="displayLeve0" :style="layoutStyle">
            <div v-for="classification in getTaxonomy" :key="classification.id">
              <Option :title="classification.title + ' (' + classification.entities.length + ')'"
                      :description="classification.description"
                      :selected="hasSelectedClassifications(classification)"
                      @toggleOption="viewSublevels(classification)"
                      :option="classification"/>
            </div>
          </div>
        </Transition>
        <div v-if="!displayLeve0" @click.stop="viewLevel0" class="view-classifications">View classifications</div>
      </div>
      <Transition name="l0">
        <div class="sub-levels" v-if="displaySublevels">
          <div>
            <h3>{{ sublevel.title }}</h3>
          </div>
          <div class="options" :style="layoutStyle">
            <div v-for="entity in sublevel.entities" :key="entity.id">
              <Option :title="entity.attributes.title"
                      :description="entity.attributes.description"
                      :selected="$store.getters.filterContainsClassification(entity.attributes.urn)"
                      @toggleOption="toggleClassification(entity.attributes)"
                      :option="entity"/>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>

import {
  ADD_CLASSIFICATION_FILTER,
  CLEAR_FILTERS,
  REMOVE_CLASSIFICATION_FILTER,
  SELECT_TAXONOMY
} from "@/store/search/store";

import Option from "@/components/Elements/Option";

export default {
  name: "TaxonomyFilter",
  components: {
    Option
  },
  props: {
    direction: String
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
  data: function() {
    return {
      displaySublevels: false,
      sublevel: undefined,
      displayLeve0: true
    }
  },
  methods: {
    hasSelectedClassifications: function(classification){
      if(classification === undefined) return false;

      if(this.$store.getters.filterContainsClassification(classification.urn)){
        return true;
      }

      if(classification.entities === undefined) return false;

      return classification.entities.some(e => this.$store.getters.classifications.find(f => f === e.id));
    },
    viewLevel0: function(){
      this.displayLeve0 = true;
      this.displaySublevels = false;
    },
    viewSublevels: function (parent){
      if(parent.entities.length < 1){
        this.toggleClassification(parent);
      }else{
        this.displayLeve0 = false;
        if(this.sublevel === parent){
          this.displaySublevels = !this.displaySublevels
        }else{
          this.displaySublevels = true;
        }
        this.sublevel = parent;
      }
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
      this.$store.dispatch(CLEAR_FILTERS);
      this.displaySublevels = false;
      this.sublevel = undefined;
      this.displayLeve0 = true;
    }
  },
  computed: {
    layoutStyle: function(){
      if(this.direction === 'column'){
        return "flex-direction: column;";
      }
      return "flex-direction: row;";
    },
    displayTaxonomies: function (){
      return Object.keys(this.$store.getters['jv/get']('taxonomy:element')).length > 1;
    },
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

.view-classifications{
  background-color: var(--selected-item-border-color);
  padding: 0.4em;
  color: white;
  border-radius: 0.2em;
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  cursor: pointer;
}

.l0-enter-active,
.l0-leave-active {
  transition: all 0.1s ease-in-out;
}

.l0-enter-from,
.l0-leave-to {
  opacity: 0;
  height: 0;
}

.taxonomy-filter {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid var(--box-border-color);
  height: min-content;
  text-align: left;
  gap: 1em;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6em;
}

.taxonomy-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6em;
}

.classifications {
  width: 100%;
}

.sub-levels{
  width: 100%;
}

.taxonomy {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.6em;
}

</style>
