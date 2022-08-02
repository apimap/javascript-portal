<template>
  <div class="metadata-filter-menu">
    <OptionGroup
        title="Visibility"
        :options="visibilityOptions"
        size="small"/>
    <OptionGroup
        title="Release status"
        :options="releaseStatusOptions"
        size="small"/>
    <OptionGroup
        title="Architecture Layer"
        :options="architectureLayerOptions"
        size="small"/>
    <OptionGroup
        title="Business Unit"
        :options="businessUnitOptions"
        size="small"/>
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

.metadata-filter-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6em;
}

</style>
