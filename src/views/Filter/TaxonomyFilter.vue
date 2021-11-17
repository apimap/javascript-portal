<template>
  <div class="taxonomy-filter">
    <div class="taxonomy">
      <div v-for="taxonomy in taxonomies"
           :key="taxonomy.id"
           class="taxonomy-item"
           v-bind:class="[ $store.getters.isSelectedTaxonomy(taxonomy) ? 'selected' : '' ]"
           @click="selectTaxonomy(taxonomy)">
        {{ taxonomy.attributes.name }}
      </div>
    </div>
    <div class="classification">
      <div v-for="classification in classifications"
           :key="classification.id"
           class="classification-item"
           v-bind:class="[ $store.getters.filterContainsClassification(classification.attributes.urn) ? 'selected' : '' ]"
           @click="toggleClassification(classification)">
        {{ classification.attributes.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ADD_CLASSIFICATION_FILTER, REMOVE_CLASSIFICATION_FILTER, SELECT_TAXONOMY, UNSELECT_TAXONOMY } from "@/store/search/store";

export default {
  name: "TaxonomyFilter",
  props: {
    taxonomies: Array
  },
  components: {
  },
  watch: {
    taxonomies: function (val) {
      this.$store.dispatch(SELECT_TAXONOMY, val[0]);
      this.downloadClassifications(val[0]);
    }
  },
  methods: {
    ...mapActions({
      loadClassifications: "taxonomyClassifications/loadByRelationship",
    }),
    downloadClassifications: function (object) {
      this.loadClassifications({ resource: object, relationship: "urn:collection" });
    },
    toggleClassification: function (object) {
      if (this.$store.getters.filterContainsClassification(object.attributes.urn)) {
        this.$store.dispatch(REMOVE_CLASSIFICATION_FILTER, object.attributes.urn);
      } else {
        this.$store.dispatch(ADD_CLASSIFICATION_FILTER, object.attributes.urn);
      }
    },
    selectTaxonomy: function(object){
      this.$store.dispatch(SELECT_TAXONOMY, object);
      this.downloadClassifications(object);
    }
  },
  computed: {
    ...mapGetters({
      classifications: "taxonomyClassifications/all",
    })
  },
};
</script>

<style scoped>

.taxonomy-filter {
  padding: 1em;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid #184e77;
  height: min-content;
}

.classification-item:hover {
  text-decoration: underline;
}

.taxonomy-item:hover {
  text-decoration: underline;
}

.taxonomy-item {
  cursor: pointer;
  text-align: left;
  margin: 0.2em;
  border: 1px solid #00a3fa;
  color: #00a3fa;
}

.classification-item {
  cursor: pointer;
  min-width: 8em;
  text-align: left;
  margin: 0.2em;
  border-width: 1px;
  border-style: solid;
}

.classification {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}



.classification > div {
  padding-top: 0.6em;
  padding-bottom: 0.6em;
  padding-left: 0.8em;
  padding-right: 0.8em;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
}

.taxonomy {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 2em;
}

.taxonomy > div {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.8em;
  padding-right: 0.8em;
}

.selected-icon :hover{
  text-decoration: none;
}

.selected-icon {
  width: fit-content;
  text-decoration: none;
  font-size: 0.6em;
  border: 1px solid #00a3fa;
  color: #00a3fa;
  margin: 0.2em;
  border-radius: 0.2em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  padding-left: 1em;
  padding-right: 1em;
}

.taxonomy-filter > div:first-child {
  padding-right: 2em;
}

select {
  margin-top: 10px;
  display: block;
  padding: 0.4em;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 1em;
  width: 100%;
  background: transparent;
  border: 2px solid #00a3fa;
  color: #00a3fa;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url("~@/assets/icons/dropdown-icon.svg") 99% / 15% no-repeat;
  background-size: 20px;
  background-position-x: calc(100%- 2px);
}


.taxonomy-item {
  border-color: #00f4af;
  color: #00f4af;
}

.taxonomy-item.selected {
  border-color: #00f4af;
  background-color: #00f4af;
  color: black;
}

.classification-item:nth-child(1) {
  border-color: #184E77;
  color: #ffffff;
}

.classification-item:nth-child(2) {
  border-color: #1A537A;
  color: #ffffff;
}

.classification-item:nth-child(3) {
  border-color: #1B587C;
  color: #ffffff;
}

.classification-item:nth-child(4) {
  border-color: #1D5C7F;
  color: #ffffff;
}

.classification-item:nth-child(5) {
  border-color: #1F6182;
  color: #ffffff;
}

.classification-item:nth-child(6) {
  border-color: #206684;
  color: #ffffff;
}

.classification-item:nth-child(7) {
  border-color: #226B87;
  color: #ffffff;
}

.classification-item:nth-child(8) {
  border-color: #24708A;
  color: #ffffff;
}

.classification-item:nth-child(9) {
  border-color: #25758C;
  color: #ffffff;
}

.classification-item:nth-child(10) {
  border-color: #27798F;
  color: #ffffff;
}

.classification-item:nth-child(11) {
  border-color: #287E91;
  color: #ffffff;
}

.classification-item:nth-child(12) {
  border-color: #2A8394;
  color: #ffffff;
}

.classification-item:nth-child(13) {
  border-color: #2C8897;
  color: #ffffff;
}

.classification-item:nth-child(14) {
  border-color: #2D8D99;
  color: #ffffff;
}

.classification-item:nth-child(15) {
  border-color: #2F929C;
  color: #ffffff;
}

.classification-item:nth-child(16) {
  border-color: #31969F;
  color: #ffffff;
}

.classification-item:nth-child(17) {
  border-color: #329BA1;
  color: #ffffff;
}

.classification-item:nth-child(18) {
  border-color: #34A0A4;
  color: #ffffff;
}

.classification-item:nth-child(1).selected {
  border-color: #184E77;
  background-color: #184E77;
  color: white;
}

.classification-item:nth-child(2).selected {
  border-color: #1A537A;
  background-color: #1A537A;
  color: white;
}
.classification-item:nth-child(3).selected {
  border-color: #1B587C;
  background-color: #1B587C;
  color: white;
}

.classification-item:nth-child(4).selected {
  border-color: #1D5C7F;
  background-color: #1D5C7F;
  color: white;
}

.classification-item:nth-child(5).selected {
  border-color: #1F6182;
  background-color: #1F6182;
  color: white;
}

.classification-item:nth-child(6).selected {
  border-color: #206684;
  background-color: #206684;
  color: white;
}

.classification-item:nth-child(7).selected {
  border-color: #226B87;
  background-color: #226B87;
  color: white;
}

.classification-item:nth-child(8).selected {
  border-color: #24708A;
  background-color: #24708A;
  color: white;
}

.classification-item:nth-child(9).selected {
  border-color: #25758C;
  background-color: #25758C;
  color: white;
}

.classification-item:nth-child(10).selected {
  border-color: #27798F;
  background-color: #27798F;
  color: white;
}

.classification-item:nth-child(11).selected {
  border-color: #287E91;
  background-color: #287E91;
  color: white;
}

.classification-item:nth-child(12).selected {
  border-color: #2A8394;
  background-color: #2A8394;
  color: white;
}

.classification-item:nth-child(13).selected {
  border-color: #2C8897;
  background-color: #2C8897;
  color: white;
}

.classification-item:nth-child(14).selected {
  border-color: #2D8D99;
  background-color: #2D8D99;
  color: white;
}

.classification-item:nth-child(15).selected {
  border-color: #2F929C;
  background-color: #2F929C;
  color: white;
}

.classification-item:nth-child(16).selected {
  border-color: #31969F;
  background-color: #31969F;
  color: white;
}

.classification-item:nth-child(17).selected {
  border-color: #329BA1;
  background-color: #329BA1;
  color: white;
}

.classification-item:nth-child(18).selected {
  border-color: #34A0A4;
  background-color: #34A0A4;
  color: white;
}
</style>
