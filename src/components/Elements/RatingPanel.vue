<template>
  <div class="rating-panel">
    <div class="container" v-if="this.enabled">
      <div><p>Documentation experience</p>Overall, how do you find the quality of this documentation?</div>
      <div><img :src="negativeRatingElement" class="option" alt="I find the documentation bellow standard" @click.stop="rate(1)"></div>
      <div><img :src="neutralRatingElement" class="option"  alt="I find the documentation ok" @click.stop="rate(3)"></div>
      <div><img :src="positiveRatingElement" class="option" alt="I find the documentation above standard" @click.stop="rate(5)"></div>
    </div>
    <div class="message" v-if="!this.enabled">
      Your feedback is appreciated
    </div>
  </div>
</template>

<script>

import negativeRatingElement from "@/assets/elements/negative-rating-elemenet.svg";
import positiveRatingElement from "@/assets/elements/positive-rating-elemenet.svg";
import neutralRatingElement from "@/assets/elements/neutral-rating-elemenet.svg";
import axios from "axios";

export default {
  name: "RatingPanel",
  props: {
    version: Object
  },
  data: function() {
    return {
      negativeRatingElement,
      positiveRatingElement,
      neutralRatingElement,
      enabled: true
    }
  },
  watch: {
    'version': function(newValue) {
      this.enabled = true;
    }
  },
  methods: {
    rate: function (value){
      axios.create({
        baseURL: APIMAP_API_URL,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      })
      .post(this.version._jv.links.self + "/vote", "{\"data\": {\"attributes\": {\"rating\": " + value +"}}}")
      .then(response => (this.enabled = false))
    }
  }
};

</script>

<style scoped>

.option {
  cursor: pointer;
}

.message{
  line-height: 4em;
  font-weight: bold;
}

p {
  margin: 0;
  padding: 0;
  margin-bottom: 0.2em;
  font-weight: bold;
}

.container{
  display: flex;
  justify-content: center;
  gap: 1em;
  align-items: center;
  height: inherit;
  text-align: left;
  font-size: 0.9em;
}

.rating-panel{
  border-top: 1px solid var(--box-border-color);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4em;
}

</style>