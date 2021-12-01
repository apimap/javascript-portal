<template>
  <div class="tooltip">
    <pre class="content">{{ content }}</pre>
  </div>
</template>

<script>

export default {
  name: "Tooltip",
  props: {
    content: String
  },
};

</script>

<style scoped>

.tooltip {
  visibility: hidden;
  position: absolute;
  z-index: 1;
  font-size: 13px;
  line-height: 1.2em;
}

.content{
  background-color: var(--tooltip-background-color);
  color: var(--tooltip-text-color);
  padding: 1em;
  width: 20em;
  border-radius: 0.2em;
  box-shadow: rgba(50, 50, 50, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

</style>