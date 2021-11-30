<template>
  <div class="consumer-startpage">
    <CenterLayout style="height:100%">
      <TaxonomyFilter :taxonomies="allTaxonomies" class="element" />
      <MetadataFilter class="element" />
      <div class="search-button" @click="search">SEARCH</div>
      <div class="floating" @click="redirectToProducer()">
        <p>I want to make a API discoverable by others</p>
        <img :src="addApiElement" alt="+"/>
      </div>
    </CenterLayout>
    <CenterLayout style="height:100%">
      <VerticalStackLayout><div>1</div><div>2</div></VerticalStackLayout>
    </CenterLayout>
  </div>
</template>

<script>
import TaxonomyFilter from "@/views/Filter/TaxonomyFilter";
import MetadataFilter from "@/views/Filter/MetadataFilter";

import addApiElement from "@/assets/elements/add-api-element.svg";

import {CenterLayout, VerticalStackLayout} from "@apimap/layout-core";

import { mapActions, mapGetters } from "vuex";
import {CLEAR_ALL_SELECTIONS} from "@/store/search/store";
import {Paths} from "@/router/paths";

export default {
  name: "ConsumerIntroduction",
  components: {
    MetadataFilter,
    TaxonomyFilter,
    CenterLayout,
    VerticalStackLayout
  },
  mounted() {
    this.$store.dispatch(CLEAR_ALL_SELECTIONS, {});
    this.loadTaxonomyList({ rel: "taxonomy:collection" });
  },
  methods: {
    redirectToProducer: function() {
      window.location.href = DEVELOPER_URL
    },
    search: function(){
      this.$router.push({ name: Paths.search.name })
    },
    ...mapActions({
      loadTaxonomyList: "taxonomies/loadByRel",
    }),
  },
  computed: {
    ...mapGetters({
      allTaxonomies: "taxonomies/all"
    }),
  },
  data: function() {
    return {
      addApiElement
    }
  }
};
</script>

<style>
#app {
  background-color: #0c1026;
}
</style>

<style scoped>

.consumer-introduction > div:first-child {
  align-items: center;
  align-content: center;
}

.consumer-startpage{
  background-color: #0c1026;
  color: white;
  padding-bottom: 6em;
}

@media (min-width: 1024px) {
  .floating{
    cursor: pointer;
    height: 10em;
    width: 10em;
    border: 2px solid var(--primary-link-background-color);
    position: fixed;
    left: 2em;
    bottom: 2em;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    color: var(--primary-link-background-color);
  }
}

@media (max-width: 1024px) {
  .floating{
    visibility: hidden;
  }
}

.search-button {
  border: 2px solid #10c170;
  color: #10c170;
  font-size: 1.4em;
  padding-top: 1em;
  width: 20em;
  padding-bottom: 1em;
  margin: auto;
  cursor: pointer;
  user-select: none;
}

.search-button:hover {
  background-color: #10c170;
  color: black;
}

.element {
  margin-bottom: 3em;
  user-select: none;
}

</style>
