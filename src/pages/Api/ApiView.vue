<template>
  <div class="api-view">
    <ApiViewVersionSelection :api="api" @versionSelected="versionCallback" class="options"/>
    <div class="content">
      <LoadingIndicator :visible="this.displayLoading"/>
      <h1 v-if="this.displayContent">{{ api.name }}</h1>
      <div class="direct-link" v-if="this.displayContent">
        DIRECT LINK: {{ link }} <span class="copyUrl copy" @click="copyToClipboard">COPY LINK</span>
      </div>
      <p v-if="this.displayContent" class="description">{{ api.description }} <img :src="copyIcon" alt="copy" class="copy" @click="copyValueToClipboard(api.description)"/></p>
      <ApiViewSelection/>
      <ApiViewMetadata :version="this.version" v-if="this.version"/>
    </div>
  </div>
</template>

<script>

import LoadingIndicator from "@/components/Elements/LoadingIndicator";

import copyIcon from "@/assets/elements/copy-to-clipboard-element.svg";

import ApiViewVersionSelection from "@/pages/Api/ApiViewVersionSelection";
import ApiViewMetadata from "@/pages/Api/ApiViewMetadata";
import ApiViewSelection from "@/pages/Api/ApiViewSelection";

export default {
  name: "ApiView",
  components: {
    ApiViewSelection,
    ApiViewVersionSelection,
    ApiViewMetadata,
    LoadingIndicator
  },
  props: {
    api: Object
  },
  methods: {
    versionCallback(selectedVersion){
      this.version = selectedVersion;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(window.location);
    },
    copyValueToClipboard(text){
      navigator.clipboard.writeText(text);
    }
  },
  computed: {
    link: function(){
      return window.location.href;
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
  height: 100%;
}

.content {
  width: 60em;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
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

.copyUrl {
  font-size: 12px;
  font-weight: bolder;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  border: 2px solid var(--button-dark-border-color);
  vertical-align: middle;
  border-radius: 4px;
  color: var(--button-dark-text-color);
  background-color: var(--button-dark-background-color);
}

.copyUrl:hover {
  text-decoration: underline;
}

img {
  vertical-align: middle;
}

</style>
