<template>
  <div class="api">
    <div class="content">
      <div class="close button"><img :src="closeElement" alt="Close" @click.stop="close"/></div>
      <ApiView :api="content" />
    </div>
  </div>
</template>

<script>
import closeElement from "@/assets/elements/close-overlay-element.svg";
import {SET_RESULTS} from "@/store/search/store";
import {Paths} from "@/router/paths";
import ApiView from "@/pages/Api/ApiView";

export default {
  name: "Api",
  components: {
    ApiView
  },
  props: {
    api: String
  },
  methods: {
    close() {
      this.$emit("closeApi")
    }
  },
  data: function() {
    return {
      closeElement,
      content: {}
    }
  },
  watch: {
    'api': {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if(newValue !== undefined){
          // TODO: Make this dynamic from returned urls
          this.$store.dispatch('jv/search', [ "api", { params: {"filter[name]": newValue }}]).then((data) => {
            this.content = data[newValue];
          });
        }
      }
    }
  },
};
</script>

<style scoped>

.api {
  background-color: rgba(0,0,0,0.8);
  position: fixed;
  height: 100vh;
  z-index: 10;
  width: 100%;
  top: 0;
  left: 0;
}

.content {
  background-color: var(--overlay-background-color);
  position: fixed;
  height: calc(100vh - 80px);
  z-index: 100;
  width: calc(100vw - 80px);
  top: 40px;
  left: 40px;
  border-radius: 4px;
  color: var(--overlay-text-color);
  min-width: 68em;
}

.close {
  position: absolute;
  right: 10px;
  top: -30px;
}

</style>
