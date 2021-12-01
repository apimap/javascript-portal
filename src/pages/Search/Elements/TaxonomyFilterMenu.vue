<template>
  <div class="taxonomy-filter-menu">
    <div class="heading button" @click.stop="toggleVisibility">
      <h4>Taxonomy filter</h4>
      <div class="toggle button" @click.stop="toggleVisibility" v-show="!visible">
        <h3>Show Taxonomy Filter</h3>
      </div>
    </div>
    <div v-show="visible">
      <TaxonomyFilter class="filter" />
      <div class="toggle button" @click.stop="toggleVisibility">
        <h3>Hide Taxonomy Filter</h3>
      </div>
    </div>
  </div>
</template>

<script>

import TaxonomyFilter from "@/pages/Startpage/Elements/TaxonomyFilter";

export default {
  name: "TaxonomyFilterMenu",
  components: {
    TaxonomyFilter
  },
  data: function() {
    return {
      visible: false
    }
  },
  methods: {
    toggleVisibility(){
      this.visible = !this.visible || false;
    }
  }
};
</script>

<style scoped>

.filter {
  border: none;
}

h3 {
  width: min-content;
  border: 1px solid var(--box-text-color);
  white-space: nowrap;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  border-radius: 0.2em;
}

.taxonomy-filter-menu {
  width: 100%;
  background-color: var(--box-background-color);
  border-radius: 0.2em;
  color: var(--box-text-color);
}

.heading {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}

.toggle {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

</style>
