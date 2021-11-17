<template>
  <div class="result-bar" v-if="api !== undefined" @click.prevent="hideApiView" >
    <div class="container" @click.stop="">
      <div class="result-bar-content">
        <div class="releaseStatusContainer">
          <img :src="closeIcon" class="close" @click.stop="hideApiView" />
          <div class="releaseStatus">{{ attributes['release status'] }}</div>
        </div>
        <div class="description">
          <div class="name">{{ attributes['name'] }} </div>
          <ApiViewVersionSelection :api="api"
                                     :currentVersion="attributes['api version']"
                                     @apiVersionSelected="apiVersionSelected"
          />
          <p class="apidescription">{{ attributes['description'] }}</p>
        </div>
        <div>
          <div class="heading">Properties</div>
          <ul class="prop">
            <li v-if="attributes['visibility'] !== ''">Visibility: {{ attributes['visibility'] }}</li>
            <li v-if="attributes['release status'] !== ''">Release Status: {{ attributes['release status'] }}</li>
            <li v-if="attributes['architecture layer'] !== ''">Architecture Layer: {{ attributes['architecture layer'] }}</li>
            <li v-if="attributes['business unit'] !== ''">Business Unit: {{ attributes['business unit'] }}</li>
            <li v-if="attributes['system identifier'] !== ''">System Identifier: {{ attributes['system identifier'] }}</li>
            <li v-if="attributes['interface description language'] !== ''">Interface Description Language: {{ attributes['interface description language'] }}</li>
            <li v-if="attributes['interface specification'] !== ''">Interface Specification: {{ attributes['interface specification'] }}</li>
          </ul>
        </div>
        <div class="documentation">
          <div class="heading">Documentation</div>
          <ul class="links">
            <li v-for="link in attributes.documentation" :key="link"><a :href="link" target="_blank">{{ link }}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import closeIcon from "@/assets/elements/close-element.svg";
import ApiViewVersionSelection from "@/views/Search/ApiViewVersionSelection";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ApiView",
  components: {ApiViewVersionSelection},
  props: {
    api: Object
  },
  methods: {
    async apiVersionSelected(version) {
      await this.loadApiVersion({resource: version});
      await this.loadApiVersionMetadata({resource: this.apiVersion, relationship: "metadata:collection"});
      this.$emit("apiSelected", this.apiVersionMetadata);
    },
    hideApiView() {
      this.$emit("hideApiView")
    },
    ...mapActions({
      loadApiVersion: "version:element/loadBySelf",
      loadApiVersionMetadata: "apiVersionMetadata/loadByRelated"
    }),
  },
  computed: {
    ...mapGetters({
      apiVersion: "version:element/resource",
      apiVersionMetadata: "apiVersionMetadata/resource"
    }),
    attributes: {
      get() {
        if(this.api.data !== undefined){
          return this.api.data.attributes;
        }

        return this.api.attributes;
      }
    },
  },
  data: function() {
    return {
      closeIcon,
    }
  }
};
</script>

<style scoped>

.close {
  position: absolute;
  right: -30px;
  top: -55px;
  cursor: pointer;
  padding-left: 0.8em;
  padding-right: 0.8em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
}

.apidescription{
  padding: 1em;
  background-color: #184e77;
  line-height: 1.2em;
}

.releaseStatus{
  background-color: #184e77;
  position: absolute;
  top: -8px;
  right: -8px;
  color: white;
  font-size: 12px;
  padding: 4px;
  border-radius: 2px;
  font-weight: bold;
}

.links > li {
  border: 1px solid white;
  color: white;
  cursor: pointer;

}

.links > li > a {
  color: white;
}

.links > li:hover {
  border: 1px solid white;
  text-decoration:  underline;
  color: white;
}

.releaseStatusContainer{
  position: relative;
}

.container {
  background-color: #00a3fa;
  width: 40em;
  height: 40em;
  color: white;
  padding: 1em;
  border-top: 4px solid #184e77;
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
  padding-left: 0.8em;
  padding-right: 0.8em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  margin-right: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 36em;
}

.prop > li {
  background-color: #184e77;
}

.heading{
  font-size: 1em;
  font-weight: bold;
  padding-top: 1.2em;
  padding-bottom: 0.2em;
  text-align: center;
}

.name{
  font-size: 2.4em;
  padding-top: 0.6em;
  padding-bottom: 0.3em;
  text-align: center;
}

.description > ul > li {
  border-color: #0c1026;
}

.selected {
  border-color: #00a3fa;
  background-color: #00a3fa;
  color: white !important;
}

.version > ul > li {
  border-color: #00a3fa;
  color: #00a3fa;
  cursor: pointer;
}

.result-bar{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: white;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-top: 0.4em;
  padding-bottom: 2em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result-bar-content{
  display: flex;
  justify-content: flex-start;
  text-align: left;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.version {
  margin-bottom: 1.2em;
}

</style>
