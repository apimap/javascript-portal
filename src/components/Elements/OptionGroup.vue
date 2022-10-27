<template>
  <div class="option-group">
    <div class="header">
      <h4 v-bind:class="{ small: size === 'small',large: size === 'large'}">{{ title }}</h4>
      <div class="clear button" @click.stop="clearAll" v-if="displayClear">Clear all</div>
    </div>
    <div class="scrollable" v-bind:style="style">
      <div v-for="option in this.options" :key="option.value">
        <Option :title="option.label"
                :description="option.description"
                :selected="$store.getters.filterContainsMetadata({key: option.filter, value: option.value})"
                @toggleOption="toggleOption"
                :option="option"/>
      </div>
    </div>
  </div>
</template>

<script>

import {ADD_METADATA_FILTER, REMOVE_METADATA_FILTER} from "@/store/search/store";

import Tooltip from "@/components/Elements/Tooltip";
import Option from "@/components/Elements/Option";

export default {
  name: "OptionGroup",
  components: {
    Tooltip,
    Option
  },
  props: {
    title: String,
    options: Array,
    size: String,
    direction: String,
    displayClear: Boolean
  },
  methods: {
    toggleOption: function (object) {
      if (this.$store.getters.filterContainsMetadata({key: object["filter"], value: object["value"]})) {
        this.$store.dispatch(REMOVE_METADATA_FILTER, {key: object["filter"], value: object["value"]});
      } else {
        this.$store.dispatch(ADD_METADATA_FILTER, {key: object["filter"], value: object["value"]});
      }
    },
    clearAll: function(){
      this.options.forEach(e => this.$store.dispatch(REMOVE_METADATA_FILTER, {key: e["filter"], value: e["value"]}));
    }
  },
  computed: {
    style: function(){
      if(this.direction === "row") return "flex-direction: row;"
      return "flex-direction: column;"
    }
  }
};

</script>

<style scoped>

.header{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.6em;
  margin-bottom: 0.6em;
  margin-top: 0.6em;
  flex-direction: row;
}

.clear{
  color: var(--button-dark-background-color);
  border: 1px solid var(--button-dark-background-color);
  font-size: 0.6em;
  border-radius: 0.2em;
  padding: 0.2em 1em;
}

.clear:hover{
  background-color: var(--button-dark-background-color);
  border: 1px solid var(--button-dark-background-color);
  color: var(--button-dark-text-color);
  font-size: 0.6em;
  border-radius: 0.2em;
  padding: 0.2em 1em;
}

.scrollable{
  padding: 0.4em;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
  justify-content: stretch;
  gap: 0.6em;
}

.option-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
}

.more-options{
  background-color: var(--selected-item-border-color);
  padding: 0.4em;
  color: white;
  border-radius: 0.2em;
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  cursor: pointer;
}

</style>