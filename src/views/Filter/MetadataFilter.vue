<template>
  <div class="metadata-filter">
    <div class="metadata">
      <h4>Visibility</h4>
      <div v-for="option in visibilityOptions"
           :key="option.value"
           class="metadata-filter-option"
           v-bind:class="[ $store.getters.filterContainsMetadata({key: option.filter, value: option.value}) ? 'selected' : '' ]"
           @click="toggleOption(option)">
        {{ option.label }}
      </div>
    </div>
    <div class="metadata">
      <h4>Release status</h4>
      <div v-for="option in releaseStatusOptions"
           :key="option.value"
           class="metadata-filter-option"
           v-bind:class="[ $store.getters.filterContainsMetadata({key: option.filter, value: option.value}) ? 'selected' : '' ]"
           @click="toggleOption(option)">
        {{ option.label }}
      </div>
    </div>
    <div class="metadata">
      <h4>Architecture Layer</h4>
      <div v-for="option in architectureLayerOptions"
           :key="option.value"
           class="metadata-filter-option"
           v-bind:class="[ $store.getters.filterContainsMetadata({key: option.filter, value: option.value}) ? 'selected' : '' ]"
           @click="toggleOption(option)">
      {{ option.label }}
      </div>
    </div>
    <div class="metadata">
      <h4>Business Unit</h4>
      <div v-for="option in businessUnitOptions"
           :key="option.value"
           class="metadata-filter-option"
           v-bind:class="[ $store.getters.filterContainsMetadata({key: option.filter, value: option.value}) ? 'selected' : '' ]"
           @click="toggleOption(option)">
      {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>

import {ADD_METADATA_FILTER, REMOVE_METADATA_FILTER} from "@/store/search/store";
import {LOAD_METADATA_OPTIONS} from "@/store/content/store";

export default {
  name: "MetadataFilter",
  mounted() {
    this.$store.dispatch(LOAD_METADATA_OPTIONS);
  },
  methods: {
    toggleOption: function (object) {
      if (this.$store.getters.filterContainsMetadata({key: object["filter"], value: object["value"]})) {
        this.$store.dispatch(REMOVE_METADATA_FILTER, {key: object["filter"], value: object["value"]});
      } else {
        this.$store.dispatch(ADD_METADATA_FILTER, {key: object["filter"], value: object["value"]});
      }
    }
  },
  computed: {
    visibilityOptions: function () {
      return this.$store.getters.metadataOptions['apiOptions'] ? this.$store.getters.metadataOptions['apiOptions']['visibilityOptions'] : [];
    },
    releaseStatusOptions: function () {
      return this.$store.getters.metadataOptions['apiVersionOptions'] ?  this.$store.getters.metadataOptions['apiVersionOptions']['releaseStatusOptions'] : [];
    },
    architectureLayerOptions: function () {
      return this.$store.getters.metadataOptions['organizationOptions'] ? this.$store.getters.metadataOptions['organizationOptions']['architectureLayerOptions'] : [];
    },
    businessUnitOptions: function () {
      return this.$store.getters.metadataOptions['organizationOptions'] ? this.$store.getters.metadataOptions['organizationOptions']['businessUnitOptions'] : [];
    }
  }
};
</script>

<style scoped>

.metadata-filter {
  padding: 1em;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #184e77;
  flex-wrap: wrap;
  height: min-content;
}

.metadata {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
  width: 14em;
  flex-direction: column;
  justify-content: flex-start;
}

h4{
  margin-top: 1em;
}

.metadata-filter-option{
  margin-top: 0.3em;
  padding-top: 0.6em;
  padding-bottom: 0.6em;
  margin-bottom: 0.3em;
  border: 1px solid #184e77;
  cursor: pointer;
}

.metadata-filter-option:hover {
  text-decoration: underline;
}

.metadata-filter-option:nth-child(2) {
  border-color: #184e77;
  color: white;
}

.metadata-filter-option:nth-child(3) {
  border-color: #1e6091;
  color: white;
}
.metadata-filter-option:nth-child(4) {
  border-color: #1a759f;
  color: white;
}

.metadata-filter-option:nth-child(5) {
  border-color: #168aad;
  color: white;
}

.metadata-filter-option:nth-child(6) {
  border-color: #34a0a4;
  color: white;
}

.metadata-filter-option:nth-child(2).selected{
  border-color: #184e77;
  background-color: #184e77;
  color: white;
}

.metadata-filter-option:nth-child(3).selected{
  border-color: #1e6091;
  background-color: #1e6091;
  color: white;
}

.metadata-filter-option:nth-child(4).selected{
  border-color: #1a759f;
  background-color: #1a759f;
  color: white;
}

.metadata-filter-option:nth-child(5).selected {
  border-color: #168aad;
  background-color: #168aad;
  color: white;
}

.metadata-filter-option:nth-child(6).selected {
  border-color: #34a0a4;
  background-color: #34a0a4;
  color: white;
}
</style>
