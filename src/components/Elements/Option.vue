<template>
  <div class="option button"
       @click="toggle"
       v-bind:class="{
             small: size === 'small',
             large: size === 'large',
             selected: selected }">
      <img :src="selectedIcon" class="checkmark" v-if="selected"/>
      {{ title }}
      <Tooltip :content="description" class="tooltip" />
    </div>
  </div>
</template>

<script>

import selectedIcon from "@/assets/icons/option-selected.svg";

import Tooltip from "@/components/Elements/Tooltip";

export default {
  name: "Option",
  components: {
    Tooltip
  },
  props: {
    title: String,
    description: String,
    option: Object,
    selected: Boolean,
    size: String
  },
  data: function() {
    return {
      selectedIcon
    }
  },
  methods: {
    toggle() {
      this.$emit("toggleOption", this.option);
    }
  }
};

</script>

<style scoped>

.checkmark {
  position: absolute;
  left: 10px;
}

.large {
  padding-top: 0.6em;
  padding-bottom: 0.6em;
  font-size: 0.8em;
  font-weight: bolder;
}

.small {
  padding-top: 0.8em;
  padding-bottom: 0.8em;
  font-size: 0.8em;
  font-weight: bolder;
}

.option {
  position: relative;
  border: 1px solid var(--unselected-item-border-color);
  border-radius: 0.2em;
  background-color: var(--unselected-item-background-color);
  color: var(--unselected-item-text-color);
  padding-left: 3em;
  padding-right: 3em;
}

.option:hover .tooltip {
  visibility: visible;
}

.option:hover {
  text-decoration: underline;
}

.option.selected {
  border: 1px solid var(--selected-item-border-color);
  color: var(--selected-item-text-color);
  background-color: var(--selected-item-background-color);
}

</style>