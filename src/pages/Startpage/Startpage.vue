<template>
  <CenterLayout width='60em'>
      <CenterLayout style="height:100%">
        <SearchField class="search-field"/>
        <h2>Browse by Taxonomy</h2>
        <TaxonomyFilter class="element" />
        <MetadataFilter class="element" />
        <div class="quick-lookup">
          <div class="soap-button button" @click="soapSearch">
            <img :src="typeSoapIcon"/>
            <span>Browse SOAP APIs</span>
          </div>
          <div class="rest-button button" @click="restSearch">
            <img :src="typeRestIcon"/>
            <span>Browse REST APIs</span>
          </div>
          <div class="sdk-button button" @click="sdkSearch">
            <img :src="typeSdkIcon"/>
            <span>Browse SDK (Code) APIs</span>
          </div>
          <div class="kafka-button button" @click="topicSearch">
            <img :src="typeTopicIcon"/>
            <span>Browse Kafka APIs</span>
          </div>
        </div>
        <div class="action-button button" @click="search">Browse all APIs</div>
      </CenterLayout>
      <Footer/>
  </CenterLayout>
</template>

<script>
import TaxonomyFilter from "@/pages/Startpage/Elements/TaxonomyFilter";
import MetadataFilter from "@/pages/Startpage/Elements/MetadataFilter";
import Footer from "@/components/Elements/Footer";

import {CenterLayout} from "@apimap/layout-core";

import {ADD_METADATA_FILTER, CLEAR_RESULTS, SET_RESULTS} from "@/store/search/store";
import {Paths} from "@/router/paths";
import SearchField from "@/components/Elements/SearchField";

import typeSdkIcon from "@/assets/icons/type-sdk-icon.svg";
import typeTopicIcon from "@/assets/icons/type-topic-icon.svg";
import typeRestIcon from "@/assets/icons/type-rest-icon.svg";
import typeSoapIcon from "@/assets/icons/type-soap-icon.svg";

export default {
  name: "Startpage",
  components: {
    SearchField,
    MetadataFilter,
    TaxonomyFilter,
    CenterLayout,
    Footer
  },
  watch: {
    '$store.state.search.results': function() {
      this.$router.push({ name: Paths.search.name });
    }
  },
  methods: {
    getOptions: function(filter){
      if(this.$store.getters.metadataOptions['implementationDetailsOptions'] === undefined) return;

      var options = new Array().concat(
          this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationImplementationOptions'],
          this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationSpecificationOptions']
      );

      if(options !== undefined){
        var match = options.filter(obj => {
          return obj['type'] === filter
        }).map(e => e['value']);

        return match;
      }

      return [];
    },
    topicSearch: function(){
      this.getOptions("KAFKA TOPIC").forEach(e => this.$store.dispatch(ADD_METADATA_FILTER, {key: "[metadata][interface specification]", value:e }));
      this.search();
    },
    sdkSearch: function(){
      this.getOptions("SDK").forEach(e => this.$store.dispatch(ADD_METADATA_FILTER, {key: "[metadata][interface specification]", value:e }));
      this.search();
    },
    restSearch: function(){
      this.getOptions("REST").forEach(e => this.$store.dispatch(ADD_METADATA_FILTER, {key: "[metadata][interface specification]", value:e }));
      this.search();
    },
    soapSearch: function(){
      this.getOptions("SOAP").forEach(e => this.$store.dispatch(ADD_METADATA_FILTER, {key: "[metadata][interface specification]", value:e }));
      this.search();
    },
    search: function(){
      this.$store.dispatch(CLEAR_RESULTS);

      // TODO: Make this dynamic from returned urls
      this.$store.dispatch('jv/get', [ "classification", { params: this.$store.getters.filters }]).then((data) => {
        this.$store.dispatch(SET_RESULTS, data);
      })
    }
  },
  data: function() {
    return {
      typeSdkIcon,
      typeTopicIcon,
      typeRestIcon,
      typeSoapIcon
    }
  },
};
</script>

<style scoped>

.element {
  margin-bottom: 3em;
  user-select: none;
}

.search-field {
  padding-top: 2em;
  padding-bottom: 4em;
}

.quick-lookup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  margin-bottom: 3em;
  height: 3em;
}

</style>
