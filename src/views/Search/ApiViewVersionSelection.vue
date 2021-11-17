<template>
  <div class="result-bar-version-selection">
    <ul>
      <li v-for="version in allVersions"
          :key="version.id"
          v-bind:class="[ currentVersion === version.attributes.version ? 'selected' : '' ]"
          @click.stop="select(version)">Version {{ version.attributes.version }}</li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "ApiViewVersionSelection",
  props: {
    api: Object,
    currentVersion: String
  },
  methods:{
    ...mapActions({
      loadVersionList: "version:collection/loadByRelated",
    }),
    select(api) {
      this.$emit("apiVersionSelected", api);
    }
  },
  watch: {
    api(){
      this.loadVersionList({ resource: this.api, relationship: "version:collection" });
    }
  },
  mounted() {
    this.loadVersionList({ resource: this.api, relationship: "version:collection" });
  },
  computed: {
    ...mapGetters({
      allVersions: "version:collection/all"
    }),
  },
};
</script>

<style scoped>

.selected{
  background-color: white;
  border: 1px solid white;
  color: #184e77;
  text-decoration: none;
}

.result-bar-version-selection{
  padding-bottom: 0.3em;
  padding-top: 0.3em;
  padding-left: 1.2em;
  padding-right: 1.2em;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

ul li{
  display: inline-block;
}

li {
  font-size: 1em;
  color: white;
  border: 1px solid white;
  padding-left: 0.8em;
  padding-right: 0.8em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  margin-right: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 14em;
  overflow: hidden;
  text-decoration: underline;
}

li:hover{
  text-decoration: none;
  border: 1px solid white;
}

</style>
