<template>
  <div class="api-view">
    <ApiViewVersionSelection :api="api" @versionSelected="versionCallback" class="options"/>
    <div class="content">
      <LoadingIndicator :visible="this.displayLoading"/>
      <h1 v-if="this.displayContent">{{ api.name }}</h1>
      <div class="direct-link" v-if="this.displayContent">
        {{ link }} <img :src="copyIcon" class="copy" @click="copyToClipboard" alt="copy"/>
      </div>
      <p v-if="this.displayContent" class="description">{{ api.description }} <img :src="copyIcon" alt="copy" class="copy" @click="copyValueToClipboard(api.description)"/></p>
      <ApiViewSelection :page="this.pageName" @pageSelected="pageCallback"/>
      <ApiViewMetadata :version="this.version" v-if="this.version" v-if="this.pageName === 'metadata'"/>
      <ApiViewReadme :version="this.version" v-if="this.version" v-if="this.pageName === 'readme'"/>
      <ApiViewChangelog :version="this.version" v-if="this.version" v-if="this.pageName === 'changelog'"/>
    </div>
  </div>
</template>

<script>

import LoadingIndicator from "@/components/Elements/LoadingIndicator";

import copyIcon from "@/assets/elements/copy-to-clipboard-element.svg";

import ApiViewVersionSelection from "@/pages/Api/ApiViewVersionSelection";
import ApiViewMetadata from "@/pages/Api/ApiViewMetadata";
import ApiViewSelection from "@/pages/Api/ApiViewSelection";
import ApiViewReadme from "@/pages/Api/ApiViewReadme";
import ApiViewChangelog from "@/pages/Api/ApiViewChangelog";

export default {
  name: "ApiView",
  components: {
    ApiViewSelection,
    ApiViewVersionSelection,
    ApiViewMetadata,
    ApiViewReadme,
    ApiViewChangelog,
    LoadingIndicator
  },
  props: {
    api: Object
  },
  methods: {
    pageCallback(pageName){
      this.pageName = pageName;
    },
    versionCallback(selectedVersion){
      this.version = selectedVersion;
      this.$emit("versionSelected", selectedVersion);
    },
    copyToClipboard() {
      navigator.clipboard.writeText(window.location);
    },
    copyValueToClipboard(text){
      navigator.clipboard.writeText(text);
    }
  },
  watch: {
    'api': function(value) {
      this.pageName = 'metadata';
    }
  },
  computed: {
    link: function(){
      return window.location;
    },
    displayLoading: function(){
      return this.api.name === undefined;
    },
    displayContent: function(){
      return this.api.name !== undefined;
    }
  },
  data: function() {
    return {
      pageName: 'metadata',
      version: undefined,
      copyIcon
    }
  }
};
</script>

<style scoped>

.options {
    width: 14em;
}

h1 {
  padding-bottom: 0;
  margin-bottom: 0;
}

.description {
  line-height: 1.4em;
}

.direct-link {
  font-size: 0.8em;
  font-weight: bolder;
  margin-top: 0.4em;
}

.api-view {
  display: flex;
  justify-content: center;
  gap: 2em;
  height: calc(100% - 4em);
}

.content {
  width: 60em;
  padding-right: 2em;
  overflow-y: auto;
  padding-bottom: 2em;
  padding-top: 1em;
}

.content::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.content > p {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-top: 2em;
  padding-bottom: 2em;
  font-size: 1.2em;
}

ul {
  list-style-type: none;
  padding-left: 1em;
  padding-right: 1em;
  text-align: left;
  font-size: 0.8em;
  white-space: nowrap;
}

img {
  vertical-align: middle;
}

</style>
