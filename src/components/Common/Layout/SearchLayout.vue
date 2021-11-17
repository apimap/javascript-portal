<template>
  <div class="search-layout">
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchLayout"
};

</script>

<style scoped>

.search-layout {
  margin: auto;
  line-height: 1.2em;
  padding-top: 4em;
  max-width: 100em;
}

.content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content > div:nth-child(1){
  width: 13em;
}

.content > div:nth-child(2){
  width: 50em;
}

.content > div:nth-child(3){
  width: 13em;
}

</style>