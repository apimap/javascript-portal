<template>
  <div class="api-view-version">
    <div class="table">
      <template class="row" v-for="(value, key) in metadata">
        <span>{{ key }}</span>
        <template v-if="Array.isArray(value)">
          <span>
            <ul>
              <li v-for="url in value" :key="url">
                <a :href="url" v-if="url.startsWith('http')" target="_blank">{{ url }}</a>
                <template v-else>{{ url }}</template>
              </li>
            </ul>
          </span>
        </template>
        <template v-else>
          <span>{{ value }} <img :src="copyIcon" alt="copy" class="copy" @click="copyToClipboard(value)"/></span>
        </template>
      </template>
    </div>
  </div>
</template>

<script>

import copyIcon from "@/assets/elements/copy-to-clipboard-element.svg";

export default {
  name: "ApiViewMetadata",
  props: {
    version: Object
  },
  methods:{
    copyToClipboard(text){
      navigator.clipboard.writeText(text);
    }
  },
  watch: {
    'version': {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$store.dispatch('jv/search', [{ _jv: { type: 'version:element' } }, { url: this.version._jv.links.self }]).then((data) => {
          this.$store.dispatch('jv/search', [{ _jv: { type: 'metadata:collection' } }, { url: this.version._jv.links.self + "/metadata"}]).then((metadata) => {
            this.metadata = metadata._jv.attrs;
          })
        })
      }
    }
  },
  data: function() {
    return {
      metadata: {},
      copyIcon
    }
  }
};
</script>

<style scoped>

.table {
  display: grid;
  grid-template-columns: auto auto;
  border-top: 1px solid var(--box-border-color);
  border-right: 1px solid var(--box-border-color);
  align-content: center;
}

.table > span {
  padding: 8px 4px;
  border-left: 1px solid var(--box-border-color);
  border-bottom: 1px solid var(--box-border-color);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

img {
  vertical-align: middle;
}

</style>
