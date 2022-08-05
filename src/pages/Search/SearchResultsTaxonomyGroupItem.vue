<template>
  <div class="search-results-taxonomy-group-item button" @click="select(api)">
    <div class="title">{{ api.name }}</div>
    <div class="description">{{ api.description }}</div>
    <div>
      <div @click.stop="copyToClipboard(api.name)" class="copy button">Copy Link</div>
      <a :href="api.codeRepository" v-if="api.codeRepository">View Source Code</a>
    </div>
    <div class="metadata">
      <ul>
        <li>Release status: {{ api['release status'] }}</li>
        <li>Version: {{ api['api version'] }}</li>
        <li>Interface: {{ api['interface specification'] }}</li>
        <li>Architecture layer: {{ api['architecture layer'] }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "SearchResultsTaxonomyGroupItem",
  props: {
    api: Object
  },
  methods:{
    select(api) {
      this.$emit("apiSelected", api)
    },
    copyToClipboard(apiName) {
      navigator.clipboard.writeText(window.location + '/' + apiName);
    },
  }
};

</script>

<style scoped>

.copy {
  white-space: break-spaces;
  border: 1px solid var(--unselected-item-border-color);
  border-radius: 0.2em;
  background-color: var(--unselected-item-background-color);
  color: var(--unselected-item-text-color);
  padding-left: 1.4em;
  padding-right: 1.4em;
  padding-top: 0.6em;
  padding-bottom: 0.6em;
  font-size: 0.8em;
  text-align: center;
  text-overflow: ellipsis;
}

.copy:hover {
  text-decoration: underline;
  border: 1px solid var(--selected-item-border-color);
  color: var(--selected-item-text-color);
  background-color: var(--selected-item-background-color);
}

.search-results-taxonomy-group-item{
  margin-bottom: 2em;
  padding: 1em;
  border-radius: 0.2em;
  border: 1px solid var(--box-border-color);
  width: 16em;
}

.search-results-taxonomy-group-item:hover {
  box-shadow: 0 .5rem 1.5rem -.75rem var(--box-border-color);
}

.search-results-taxonomy-group-item:hover > .title {
  text-decoration: underline;
}

.description {
  padding-top: 0.4em;
  padding-bottom: 1em;
  margin-bottom: 1em;
  font-size: 1.2em;
  max-height: 5em;
  white-space: normal;
  line-height: 1.2em;
  text-overflow: ellipsis;
  overflow: hidden;
}

p {
  line-height: 1.2em;
}

.title{
  padding-top: 0.2em;
  padding-bottom: 0.5em;
  font-size: 2em;
  white-space: normal;
  line-height: 1.1em;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 1.4em;
  margin-bottom: 0.6em;
}

li {
  font-size: 0.8em;
  padding-right: 0.8em;
  margin-right: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>