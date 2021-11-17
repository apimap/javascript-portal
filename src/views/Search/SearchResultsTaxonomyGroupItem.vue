<template>
  <div class="search-results-taxonomy-group-item" @click="select(api)">
    <div class="title">{{ api.attributes.name }}</div>
    <div class="metadata">
      <ul>
        <li>{{ api.attributes['release status'] }}</li>
        <li>Version {{ api.attributes['api version'] }}</li>
      </ul>
    </div>
    <div class="description">{{ api.attributes.description }}</div>
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
    }
  }
};

</script>

<style scoped>

.search-results-taxonomy-group-item{
  cursor: pointer;
  margin-bottom: 2em;
  padding-left: 1em;
  padding-right: 1em;
  border-left: 1px solid #184e77;
}

.search-results-taxonomy-group-item:hover {
  border-left: 4px solid #00a3fa;
  padding-left: 1em;
  padding-right: 1em;
}

.search-results-taxonomy-group-item:hover > .title {
  text-decoration: underline;
  color: #00a3fa;
}

.description {
  padding-top: 0.4em;
  padding-bottom: 1em;
}

p {
  line-height: 1.2em;
}

.title{
  padding-top: 0.6em;
  padding-bottom: 0.4em;
  font-size: 2em;
  line-height: 1.4em;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 0.4em;
  margin-bottom: 0.6em;
}

ul li{
  display: inline-block;
}

li {
  border: 1px solid #a7a7a7;
  font-size: 0.8em;
  padding-left: 0.8em;
  padding-right: 0.8em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  margin-right: 1em;
}

</style>