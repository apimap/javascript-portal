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

.content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1em;
}

.menu{
  width: 14em;
}

.results {
  width: max-content;
  flex: 1 0 auto;
}

</style>