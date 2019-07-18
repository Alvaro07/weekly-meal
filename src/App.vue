<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "styles/index";

/**
  * base app styles
  */

.app {
  display: block;
  height: 100%;
  min-height: 100%;
}

/**
  * Comun container
  */

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
