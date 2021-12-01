<template>
  <div class="option-group">
    <h4 v-bind:class="{
             small: size === 'small',
             large: size === 'large'}">{{ title }}</h4>
    <div v-for="option in options" :key="option.value">
      <Option :title="option.label"
              :description="option.description"
              :selected="$store.getters.filterContainsMetadata({key: option.filter, value: option.value})"
              :size="size"
              @toggleOption="toggleOption"
              :option="option"/>
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
    size: String
  },
  methods: {
    toggleOption: function (object) {
      if (this.$store.getters.filterContainsMetadata({key: object["filter"], value: object["value"]})) {
        this.$store.dispatch(REMOVE_METADATA_FILTER, {key: object["filter"], value: object["value"]});
      } else {
        this.$store.dispatch(ADD_METADATA_FILTER, {key: object["filter"], value: object["value"]});
      }
    }
  }
};

</script>

<style scoped>

.option-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.6em;
}

</style>