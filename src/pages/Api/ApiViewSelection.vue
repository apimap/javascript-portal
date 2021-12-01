<template>
  <div class="api-view-selection">
    <ul>
      <li class="selected">Metadata</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "ApiViewSelection",
};

</script>

<style scoped>

.api-view-selection{
  height: 4em;
  border-bottom: 1px solid var(--box-border-color);
  text-align: left;
  margin-bottom: 1em;
}

.selected {
  border-bottom: 2px solid;
  font-weight: bolder;
}

ul li{
  display: inline-block;
  padding-left: 1em;
  padding-right: 1em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  line-height: 4em;
}

</style>
