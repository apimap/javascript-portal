<template>
  <div class="search-field">
    <div class="category button">
      <div class="title" @click.self="showCategories">{{ this.category.label }} <img :src="showElement"><Tooltip class="tooltip" :content="this.category.description" /></div>
      <ul class="dropdown" v-show="categoriesVisible">
        <li v-for="(category, index) in searchCategories"
            :key="category.value"
            :value="category.value"
            @click.stop="setCategory(category)"
            class="button">
          {{ category.label }} | <span class="dropdown-description">{{ category.description }}</span>
        </li>
      </ul>
    </div>
    <input class="input"
           :placeholder="placeholder"
           v-model="value"
           v-on:keyup.enter="search" />
    <div class="container">
      <div class="search-botton button" @click="search">Search</div>
    </div>
  </div>
</template>

<script>

import {LOAD_SEARCH_OPTIONS} from "@/store/content/store";
import { Select } from "@apimap/input-core";
import showElement from "@/assets/elements/show-element.svg";
import {CLEAR_FILTERS, CLEAR_RESULTS, SET_RESULTS} from "@/store/search/store";
import {Paths} from "@/router/paths";
import Tooltip from "@/components/Elements/Tooltip";

export default {
  name: "SearchField",
  components: {
    Tooltip,
    Select
  },
  data: function() {
    return {
      category: {},
      value: '',
      categoriesVisible: false,
      showElement
    }
  },
  computed: {
    searchCategories: function () {
      return this.$store.getters.searchOptions['searchCategories'] ? this.$store.getters.searchOptions['searchCategories'] : [];
    },
    placeholder: function (){
      if(this.category === undefined || this.category.label === undefined) return "";
      return "Find API functionality by " + this.category.label.toLowerCase();
    }
  },
  mounted() {
    this.$store.dispatch(LOAD_SEARCH_OPTIONS);
  },
  watch: {
    '$store.state.content.searchOptions': function(newValue) {
      this.category = newValue.searchCategories[0];
    },
    'category': function(newValue) {
      this.categoriesVisible = false;
    }
  },
  methods: {
    showCategories: function (){
      this.categoriesVisible = true;
    },
    hideCategories: function (){
      this.categoriesVisible = false;
    },
    setCategory: function(object){
      this.category = object;
      this.categoriesVisible = false;
    },
    search: function(){
      this.$store.dispatch(CLEAR_FILTERS);

      // TODO: Make this dynamic from returned urls
      let params = { 'query[field]': this.category['value'], 'query[value]': this.value}
      this.$store.dispatch('jv/get', [ "classification", { params: params }]).then((data) => {
        this.$store.dispatch(SET_RESULTS, data);
      })
    }
  },
};

</script>

<style scoped>

.dropdown-description{
  font-size: 0.8em;
  font-weight: lighter;
}

ul {
  list-style-type: none;
  padding-left: 1em;
  padding-right: 1em;
  text-align: left;
  font-size: 0.8em;
}

.title {
  font-weight: bold;
  font-size: 0.7em;
}

.title:hover .tooltip {
  visibility: visible;
}

.container{
  position: relative;
}

.dropdown {
  position: absolute;
  top: 50%;
  z-index: 2;
  background-color: white;
  margin: 0;
  transform: translate(0, -50%);
  border-radius: 0.2em;
  box-shadow: rgba(50, 50, 50, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.search-botton {
  position: absolute;
  left: -5.6em;
  top: 0.3em;
  z-index: 1;
  color: var(--search-button-text-color);
  line-height: 2em;
  display: inline-block;
  width: 3em;
  height: 2em;
  background-color: var(--search-button-background-color);
  border: 1px solid var(--search-button-border-color);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  border-radius: 0.1em;
}

.search-botton:hover{
  color: var(--search-button-selected-text-color);
  background-color: var(--search-button-selected-background-color);
  border: 1px solid var(--search-button-selected-background-color);
}

.search-field {
  height: 3em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  padding-top: 2em;
  padding-bottom: 2em;
}

.category {
  border: 1px solid var(--search-field-background-color);
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  color: var(--search-field-background-color);
  width: 20%;
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  line-height: 2.1em;
  position: relative;
}

.input:focus {
  outline-width: 0;
}

.input {
  background-color: var(--search-field-background-color);
  border: 1px solid var(--search-field-background-color);
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  color: var(--search-field-text-color);
  width: 80%;
  text-align: center;
  font-weight: bold;
  font-size: 1.4em;
}

</style>