<template>
  <div id="app" class="app">
    
    <!-- <div id="nav">
      <router-link to="/home">Home</router-link>|
      <router-link to="/login">login</router-link>
    </div> -->

    <router-view/>
  </div>
</template>

<style lang="scss">
@import "styles/index";

.app {
  display: block;
  height: 100%;
  min-height: 100%;
}

.page-content {
  &__main {
    --main-padding: 20px;

    max-width: 1400px;
    margin: 0 auto;
    padding: var(--main-padding);

    @include mediaTablet() {
      --main-padding: 30px 20px;
    }
  }
}
</style>
