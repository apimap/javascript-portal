<template>
  <div class="search-layout">
    <div class="content">
      <div class="menu">
        <slot name="menu"/>
      </div>
      <div class="results">
        <slot name="results"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultLayout"
};

</script>

<style scoped>

.search-layout {
  height: 100%;
}

.content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1em;
}

.menu{
  min-width: 14em;
  width: 14em;
  overflow-y: scroll;
  overflow-x: hidden;
  position: -webkit-sticky;
  position: sticky;
  top: 60px;
  height: calc(100vh - 58px);
  padding-right: 1em;
  align-self: flex-start;
}

.results {
  padding-top: 1em;
  min-width: 40em;
  max-width: 100%;
  flex: 1 0 auto;
  margin-left: 1em;
}

</style>