<template>
  <div class="api-view-readme">
    <span v-html="this.markdown" class="markdown"/>
  </div>
</template>

<script>

import client from "@/clients/document-client"

export default {
  name: "ApiViewReadme",
  props: {
    version: Object
  },
  watch: {
    'version': {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (this.version !== undefined) {
          this.markdown = undefined;

          // TODO: Make this dynamic from returned urls
          client.get(this.version._jv.links.self + "/readme")
              .then(response => (this.markdown = response.data))
              .catch(response => (this.markdown = "No README found for this API"))
        }
      }
    }
  },
  data: function() {
    return {
      markdown: undefined
    }
  }
};
</script>

<style scoped>

.markdown{
  text-align: left;
}

</style>

<style>

.markdown > blockquote {
  background-color: var(--box-border-color);
  padding-top: 0.4em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 0.4em;
}

.markdown > pre {
  border: 1px solid var(--box-border-color);
  padding: 1em;
  margin-left: 2em;
}

</style>