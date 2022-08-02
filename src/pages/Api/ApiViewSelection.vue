<template>
  <div class="api-view-selection">
    <ul>
      <li class="" v-bind:class="[ page === 'metadata' ? 'selected' : '' ]" @click.stop="selectPage('metadata')">Metadata</li>
      <li class="" v-bind:class="[ page === 'readme' ? 'selected' : '' ]" @click.stop="selectPage('readme')">Readme</li>
      <li class="" v-bind:class="[ page === 'changelog' ? 'selected' : '' ]" @click.stop="selectPage('changelog')">Changelog</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "ApiViewSelection",
  props: {
    page: String
  },
  methods:{
    selectPage(page){
      this.$emit("pageSelected", page);
    }
  }
};

</script>

<style scoped>

li:hover{
  font-weight: bold;
}

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
