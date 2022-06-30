<template>
  <div class="result-bar-version-selection">
    <h3>Available API Versions</h3>
    <LoadingIndicator :visible="this.displayLoading"/>
    <ul>
      <li v-for="version in versions"
          :key="version.version"
          v-bind:class="[ currentVersion === version.version ? 'selected' : '' ]"
          @click.stop="selectVersion(version)"
          class="option button">
        <img :src="selectedIcon" class="checkmark" v-if="currentVersion === version.version"/> Version {{ version.version }}
      </li>
    </ul>
  </div>
</template>

<script>

import LoadingIndicator from "@/components/Elements/LoadingIndicator";
import selectedIcon from "@/assets/icons/option-selected.svg";

export default {
  name: "ApiViewVersionSelection",
  props: {
    api: Object
  },
  components: {
    LoadingIndicator
  },
  methods:{
    selectVersion(version){
      this.currentVersion = version.version;
      this.$emit("versionSelected", version);
    }
  },
  data: function() {
    return {
      versions: [],
      currentVersion: String,
      selectedIcon,
      displayLoading: true
    }
  },
  watch: {
    api(){
      // TODO: Make this dynamic from returned urls
      this.$store.dispatch('jv/search', "api/" + this.api.name + '/version').then((data) => {
        this.versions = Object.keys(data).filter((key) => key !== '_jv').map((key) => { return data[key] });
        if(this.versions.length == 1){
          this.selectVersion(this.versions[0]);
        }
        this.displayLoading = false;
      })
    }
  }
};
</script>

<style scoped>

.checkmark {
  position: absolute;
  left: 10px;
}

.option {
  position: relative;
  border: 1px solid var(--unselected-item-border-color);
  border-radius: 0.2em;
  background-color: var(--unselected-item-background-color);
  color: var(--unselected-item-text-color);
  padding-left: 3em;
  padding-right: 3em;
}

.option:hover .tooltip {
  visibility: visible;
}

.option:hover {
  text-decoration: underline;
}

.option.selected {
  border: 1px solid var(--selected-item-border-color);
  color: var(--selected-item-text-color);
  background-color: var(--selected-item-background-color);
}

.result-bar-version-selection{
  padding-bottom: 0.3em;
  padding-top: 0.3em;
  padding-left: 1.2em;
  padding-right: 1.2em;
  text-align: center;
  border-right: 1px solid var(--box-border-color);
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
  border: 1px solid var(--selected-item-background-color);
  padding-left: 0.8em;
  padding-right: 0.8em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-decoration: underline;
  margin-bottom: 0.6em;
  width: 8em;
}

li:hover{
  text-decoration: none;
}

</style>
