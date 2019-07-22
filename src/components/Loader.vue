<template>
  <div class="c-loader" :class="{'c-loader--small': small}"></div>
</template>


<script>
export default {
  name: "loader",
  props: {
    small: {
      type: Boolean,
      required: false
    }
  }
};
</script>


<style lang="scss">
/**
  * Loader component
  */

.c-loader {
  display: block;
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top: 4px solid $green;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  &--small {
    width: 80px;
    height: 80px;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 4px solid transparent;
  }

  &::before {
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-top-color: $darkGreen;
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3.5s linear infinite;
  }
  &::after {
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-top-color: $lightOrange;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.75s linear infinite;
  }

  /**
  * Loader text 'loading'
  */

  &__text {
    color: white;
    font-weight: 500;
    font-size: 1.6rem;
    padding-top: 25px;
  }
}

/**
  * Animation
  */

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
