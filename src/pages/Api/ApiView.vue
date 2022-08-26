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
      <p v-if="this.displayCodeRepository" class="code-repository"> Code Repository: {{ api.codeRepository }} <img :src="copyIcon" alt="copy" class="copy" @click="copyValueToClipboard(api.codeRepository)"/></p>
      <ApiViewSelection :page="this.pageName" @pageSelected="pageCallback"/>
      <ApiViewMetadata :version="this.version" v-if="this.version && this.pageName === 'metadata'"/>
      <ApiViewReadme :version="this.version" v-if="this.version && this.pageName === 'readme'"/>
      <ApiViewChangelog :version="this.version" v-if="this.version && this.pageName === 'changelog'"/>
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
  mounted() {
    if(this.$route.params.page !== undefined){
      this.pageName = this.$route.params.page;
    }else{
      this.pageName = 'metadata';
    }
  },
  methods: {
    pageCallback(pageName){
      this.pageName = pageName;
      this.navigate();
    },
    versionCallback(selectedVersion){
      if(this.version !== selectedVersion) {
        this.version = selectedVersion;
        this.$emit("versionSelected", selectedVersion);
        this.navigate();
      }
    },
    navigate(){
      if(this.api.name !== undefined && this.version === undefined && this.pageName === undefined){
        this.$router.push({ name: 'Api', params: { api: this.api.name }});
      }

      if(this.api.name !== undefined && this.version !== undefined && this.pageName === undefined) {
        this.$router.push({ name: 'Api Version', params: { api: this.api.name, version: this.version.version }});
      }

      if(this.api.name !== undefined && this.version !== undefined && this.pageName !== undefined) {
        this.$router.push({ name: 'Api Version Page', params: { api: this.api.name, version: this.version.version, page: this.pageName }});
      }
    },
    copyToClipboard(){
      navigator.clipboard.writeText(window.location);
    },
    copyValueToClipboard(text){
      navigator.clipboard.writeText(text);
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
    },
    displayCodeRepository: function(){
      return this.api.codeRepository !== undefined;
    }
  },
  data: function() {
    return {
      version: undefined,
      pageName: undefined,
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
  line-height: 1.2em;
}

.code-repository{
  line-height: 1.1px;
  padding: 0 !important;
  margin: 1em !important;
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
  width: 100%;
  padding-right: 2em;
  overflow-y: scroll;
  padding-bottom: 2em;
  padding-top: 1em;
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
