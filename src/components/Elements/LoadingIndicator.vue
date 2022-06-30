<template>
  <transition name="fade">
    <div class="loading-indicator" v-show="visible" style="transition-delay: 0ms">
      <div class="cirle"></div>
      <div class="cirle"></div>
      <div class="cirle"></div>
      <div class="cirle"></div>
      <div class="cirle"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LoadingIndicator",
  props: {
    visible: Boolean
  }
};
</script>

<style scoped>

.fade-enter-active{
  transition: opacity 20ms;
}

.fade-leave-active{
  transition: opacity 0s;
}

.fade-leave-active {
  opacity: 0;
}

@keyframes scaling{
  0%, 100%{
    transform: scale(0.2);
  }
  40%{
    transform: scale(1);
  }
  50%{
    transform: scale(1);
  }
}

.loading-indicator{
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 2em;
  padding-bottom: 2em;
  gap: 0.4em;
}

.cirle {
  height: 1em;
  width: 1em;
  border-radius:50%;
  transform: scale(0);
  background-color: #5c5470;
  animation: scaling 1.5s ease-in-out infinite;
  display: inline-block;
  margin:.5rem;
}

.cirle:nth-child(0){
  animation-delay:0s;
}

.cirle:nth-child(1){
  animation-delay:0.2s;
}

.cirle:nth-child(2){
  animation-delay:0.4s;
}

.cirle:nth-child(3){
  animation-delay:0.6s;
}

.cirle:nth-child(4){
  animation-delay:0.8s;
}

.cirle:nth-child(5){
  animation-delay:1s;
}

</style>
