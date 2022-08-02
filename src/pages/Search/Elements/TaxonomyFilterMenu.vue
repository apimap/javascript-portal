<template>
  <div class="taxonomy-filter-menu">
    <TaxonomyFilter class="filter" direction="column" />
  </div>
</template>

<script>

import TaxonomyFilter from "@/pages/Startpage/Elements/TaxonomyFilter";

export default {
  name: "TaxonomyFilterMenu",
  components: {
    TaxonomyFilter
  }
};
</script>

<style scoped>

h3 {
  width: min-content;
  white-space: nowrap;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  border-radius: 0.2em;
}

.taxonomy-filter-menu {
  width: 100%;
  margin-top: 2em;
  margin-bottom: 2em;
}

</style>
