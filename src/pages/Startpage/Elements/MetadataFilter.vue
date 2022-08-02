<template>
  <div class="metadata-filter">
    <OptionGroup
        title="Visibility"
        :options="visibilityOptions"
        size="large"/>
    <OptionGroup
        title="Release status"
        :options="releaseStatusOptions"
        size="large"/>
    <OptionGroup
        title="Architecture Layer"
        :options="architectureLayerOptions"
        size="large"/>
    <OptionGroup
        title="Business Unit"
        :options="businessUnitOptions"
        size="large"/>
  </div>
</template>

<script>

import OptionGroup from "@/components/Elements/OptionGroup";
import {LOAD_METADATA_OPTIONS} from "@/store/content/store";

export default {
  name: "MetadataFilter",
  components: {
    OptionGroup
  },
  mounted() {
    this.$store.dispatch(LOAD_METADATA_OPTIONS);
  },
  computed: {
    visibilityOptions: function () {
      return this.$store.getters.metadataOptions['apiOptions'] ? this.$store.getters.metadataOptions['apiOptions']['visibilityOptions'] : [];
    },
    releaseStatusOptions: function () {
      return this.$store.getters.metadataOptions['apiVersionOptions'] ?  this.$store.getters.metadataOptions['apiVersionOptions']['releaseStatusOptions'] : [];
    },
    architectureLayerOptions: function () {
      return this.$store.getters.metadataOptions['organizationOptions'] ? this.$store.getters.metadataOptions['organizationOptions']['architectureLayerOptions'] : [];
    },
    businessUnitOptions: function () {
      return this.$store.getters.metadataOptions['organizationOptions'] ? this.$store.getters.metadataOptions['organizationOptions']['businessUnitOptions'] : [];
    }
  }
};
</script>

<style scoped>

.metadata-filter {
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid var(--box-border-color);
  flex-wrap: wrap;
}

</style>
