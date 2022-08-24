<template>
  <div class="result-bar-version-selection">
    <h3>Available API Versions</h3>
    <LoadingIndicator :visible="this.displayLoading"/>
    <div class="versions">
      <div v-for="version in versions"
          :key="version.version"
          @click.stop="selectVersion(version)">
        <div class="filter-button button"
             v-bind:class="[ currentVersion === version.version ? 'selected' : '' ]">
          <img :src="selectedIcon" class="checkmark" v-if="currentVersion === version.version"/> Version {{ version.version }}
        </div>
        <div class="rating" v-if="version.rating.documentation > 0">{{ stars(version.rating.documentation) }}/5 documentation rating</div>
      </div>
    </div>
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
  mounted() {
    if( this.$route.params.version !== undefined){
      this.currentVersion = this.$route.params.version;
    }
  },
  methods:{
    selectVersion(version){
      if(version !== undefined){
        this.currentVersion = version.version;
        this.$emit("versionSelected", version);
      }
    },
    stars: function(value){
      if( value < 1 ) return 0;
      if( value > 5 ) return 5;
      return value;
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
        this.displayLoading = false;
        this.versions = Object.keys(data).filter((key) => key !== '_jv').map((key) => { return data[key] });
        if(this.versions.length === 1){ this.selectVersion(this.versions[0]);
        }else{ this.selectVersion(this.versions.find(o => o.version === this.currentVersion)); }
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
  margin-bottom: 0.6em;
  font-size: 1em;
  padding-left: 0.8em;
  padding-right: 0.8em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-decoration: underline;
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

.versions {
  padding-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 1.4em;
}

.rating {
  margin: 0;
  text-align: left;
  font-size: 0.8em;
}

</style>
