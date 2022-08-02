<template>
  <div class="search-field">
    <div class="search-field-container">
      <div class="category button">
        <div class="title" @click.self="showCategories">{{ this.category.label }} <img :src="showElement"></div>
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
        <img class="search-botton" :src="searchElement" @click="search" />
      </div>
    </div>
  </div>
</template>

<script>

import {LOAD_SEARCH_OPTIONS} from "@/store/content/store";
import { Select } from "@apimap/input-core";
import showElement from "@/assets/elements/show-element.svg";
import {CLEAR_FILTERS, CLEAR_RESULTS, SET_RESULTS} from "@/store/search/store";
import searchElement from "@/assets/elements/search-element.svg";


export default {
  name: "SearchField",
  components: {
    Select
  },
  data: function() {
    return {
      category: {},
      value: '',
      categoriesVisible: false,
      showElement,
      searchElement
    }
  },
  computed: {
    searchCategories: function () {
      return this.$store.getters.searchOptions['searchCategories'] ? this.$store.getters.searchOptions['searchCategories'] : [];
    },
    placeholder: function (){
      if(this.category === undefined || this.category.label === undefined) return "";
      return "Find by " + this.category.label.toLowerCase();
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

.container{
  position: relative;
}

.dropdown {
  position: absolute;
  top: calc(200% + 30px);
  z-index: 2;
  background-color: white;
  margin: 0;
  transform: translate(0, -50%);
  border-radius: 0.2em;
  box-shadow: rgba(50, 50, 50, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.search-botton {
  position: absolute;
  left: -33px;
  top: 3px;
  z-index: 1;
  display: inline-block;
}

.search-field{
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: stretch;
  width: 100%;
}

.search-field-container {
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  width: 30em;
}

.category {
  border: 1px solid var(--box-border-color);
  border-bottom-left-radius: 33px;
  border-top-left-radius: 33px;
  border-right: none;
  color: var(--search-field-background-color);
  width: 10em;
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  line-height: 36px;
  position: relative;
}

.input:focus {
  outline-width: 0;
}

.input {
  border: 1px solid var(--box-border-color);
  border-bottom-right-radius: 33px;
  border-top-right-radius: 33px;
  border-left: none;
  color: var(--search-field-background-color);
  width: 80%;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}

</style>