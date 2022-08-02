<template>
  <div class="tooltip" v-bind:style="style">
    <pre class="content">{{ content }}</pre>
  </div>
</template>

<script>

export default {
  name: "Tooltip",
  props: {
    content: String,
    x: Number,
    y: Number
  },
  computed: {
    style: function () {
      return "left: " + this.x + "px;top: " + this.y + "px";
    }
  }
};

</script>

<style scoped>

.tooltip {
  visibility: hidden;
  position: fixed;
  z-index: 20;
  font-size: 13px;
  line-height: 1.2em;
  right: 0;
  top: 30px;
}

.content{
  background-color: var(--tooltip-background-color);
  color: var(--tooltip-text-color);
  padding: 1em;
  width: 16em;
  border-radius: 0.2em;
  box-shadow: rgba(50, 50, 50, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

</style>