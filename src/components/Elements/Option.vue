<template>
  <div class="filter-button button"
       @click="toggle"
       @mouseleave="enableHover"
       @mouseover="setPosition"
       v-bind:class="{
             selected: selected,
             hoverEnabled: hoverEnabled}">
    <img :src="selectedIcon" class="checkmark" v-if="selected"/>
    {{ title }}
    <Tooltip :content="description"
             class="tooltip"
             :x="tooltipX"
             :y="tooltipY" />
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
    selected: Boolean
  },
  data: function() {
    return {
      selectedIcon,
      hoverEnabled: true,
      tooltipX: 0,
      tooltipY: 0
    }
  },
  methods: {
    enableHover(){
      this.hoverEnabled = true;
    },
    toggle() {
      this.hoverEnabled = false;
      this.$emit("toggleOption", this.option);
    },
    setPosition(event){
      this.tooltipX = event.pageX;
      this.tooltipY = event.pageY;
    }
  }
};

</script>

<style scoped>

.checkmark {
  position: absolute;
  left: 0;
}

.hoverEnabled:hover .tooltip {
  visibility: visible;
}

</style>