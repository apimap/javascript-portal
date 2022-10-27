<template>
  <div class="metadata-filter-menu">
    <div class="categories">
      <div><h3>Filter Options:</h3></div>
      <div class="option-button button" @click.stop="viewVisibilityOptions">Visibility ({{ numberOfVisibilityOptionsSelected }})</div>
      <div class="option-button button" @click.stop="viewReleaseStatusOptions">Release status ({{ numberOfReleaseStatusOptionsSelected }})</div>
      <div class="option-button button" @click.stop="viewArchitectureLayerOptions">Architecture Layer ({{ numberOfArchitectureLayerOptionsSelected }})</div>
      <div class="option-button button" @click.stop="viewBusinessUnitOptions">Business Unit ({{ numberOfBusinessUnitOptionsSelected }})</div>
      <div class="option-button button" @click.stop="viewInterfaceOptions">Interface ({{ numberOfInterfaceOptionsSelected }})</div>
    </div>
    <div class="options" v-if="filters">
      <div @click.stop="close" class="view-classifications button">Close</div>
      <OptionGroup
          title="Interface"
          :options="filters"
          size="small"
          direction="row"
          :display-clear=true />
    </div>
  </div>
</template>

<script>

import OptionGroup from "@/components/Elements/OptionGroup";
import {LOAD_METADATA_OPTIONS} from "@/store/content/store";

export default {
  name: "MetadataFilterMenu",
  components: {
    OptionGroup
  },
  mounted() {
    this.$store.dispatch(LOAD_METADATA_OPTIONS);
  },
  data: function(){
    return {
      filters: undefined
    }
  },
  methods:{
    close(){
      this.filters = undefined;
    },
    viewVisibilityOptions(){
      this.filters = this.$store.getters.metadataOptions['apiOptions']
          ? this.$store.getters.metadataOptions['apiOptions']['visibilityOptions']
          : [];
    },
    viewInterfaceOptions(){
      if(this.$store.getters.metadataOptions['implementationDetailsOptions'] === undefined) return;

      this.filters = [].concat(
          this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationImplementationOptions'] !== undefined
              ? this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationImplementationOptions']
              : [],
          this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationSpecificationOptions'] !== undefined
              ? this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationSpecificationOptions']
              : []
      );
    },
    viewBusinessUnitOptions(){
      this.filters = this.$store.getters.metadataOptions['organizationOptions']
          ? this.$store.getters.metadataOptions['organizationOptions']['businessUnitOptions']
          : [];
    },
    viewArchitectureLayerOptions(){
      this.filters = this.$store.getters.metadataOptions['organizationOptions']
          ? this.$store.getters.metadataOptions['organizationOptions']['architectureLayerOptions']
          : [];
    },
    viewReleaseStatusOptions(){
      this.filters = this.$store.getters.metadataOptions['apiVersionOptions']
          ?  this.$store.getters.metadataOptions['apiVersionOptions']['releaseStatusOptions']
          : [];
    }
  },
  computed: {
    numberOfVisibilityOptionsSelected(){
      return this.$store.getters.count('[metadata][visibility]')
          + "/"
          + (this.$store.getters.metadataOptions['apiOptions']
              ? this.$store.getters.metadataOptions['apiOptions']['visibilityOptions'].length
              : 0);
    },
    numberOfReleaseStatusOptionsSelected(){
      return this.$store.getters.count('[metadata][release status]')
          + "/"
          + (this.$store.getters.metadataOptions['apiVersionOptions']
              ?  this.$store.getters.metadataOptions['apiVersionOptions']['releaseStatusOptions'].length
              : 0);
    },
    numberOfArchitectureLayerOptionsSelected(){
      return this.$store.getters.count('[metadata][architecture layer]')
          + "/"
          + (this.$store.getters.metadataOptions['organizationOptions']
              ? this.$store.getters.metadataOptions['organizationOptions']['architectureLayerOptions'].length
              : 0);
    },
    numberOfBusinessUnitOptionsSelected(){
      return this.$store.getters.count('[metadata][business unit]')
          + "/"
          + (this.$store.getters.metadataOptions['organizationOptions']
              ? this.$store.getters.metadataOptions['organizationOptions']['businessUnitOptions'].length
              : 0);
    },
    numberOfInterfaceOptionsSelected(){
      if(this.$store.getters.metadataOptions['implementationDetailsOptions'] === undefined) return 0;

      var content = [].concat(
          this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationImplementationOptions']
              ? this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationImplementationOptions']
              : [],
          this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationSpecificationOptions']
              ? this.$store.getters.metadataOptions['implementationDetailsOptions']['interfaceSpecificationSpecificationOptions']
              : []
      );
      return this.$store.getters.count('[metadata][interface specification]') + "/" + content.length;
    },
    visibilityOptions: function () {
      return this.$store.getters.metadataOptions['apiOptions']
          ? this.$store.getters.metadataOptions['apiOptions']['visibilityOptions']
          : [];
    },
    releaseStatusOptions: function () {
      return this.$store.getters.metadataOptions['apiVersionOptions']
          ?  this.$store.getters.metadataOptions['apiVersionOptions']['releaseStatusOptions']
          : [];
    },
    architectureLayerOptions: function () {
      return this.$store.getters.metadataOptions['organizationOptions']
          ? this.$store.getters.metadataOptions['organizationOptions']['architectureLayerOptions']
          : [];
    },
    businessUnitOptions: function () {
      return this.$store.getters.metadataOptions['organizationOptions']
          ? this.$store.getters.metadataOptions['organizationOptions']['businessUnitOptions']
          : [];
    }
  }
};
</script>

<style scoped>

.metadata-filter-menu {
  position: relative;
  z-index: 1;
}

.categories{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2em;
  border-bottom: 1px dashed var(--box-border-color);
  margin-bottom: 2em;
  padding-bottom: 0.4em;
  align-items: center;
}

.view-classifications{
  background-color: var(--selected-item-border-color);
  padding: 0.4em;
  color: white;
  border-radius: 0.2em;
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  cursor: pointer;
}

.options{
  padding: 1em;
  min-width: 40em;
  width: 100%;
  height: 20em;
  overflow-y: scroll;
  position: absolute;
  top: 2.8em;
  color: var(--box-text-color);
  background-color: var(--box-background-color);
}

</style>
