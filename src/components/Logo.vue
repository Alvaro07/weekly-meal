<template>
  <h1 class="c-logo" :class="{'c-logo--small': small}">
    <span class="c-logo__icon">
      <font-awesome-icon icon="utensils"/>
    </span>
    <span class="c-logo__text">
      W<em>ee</em>kly
      M<em>e</em>al
    </span>
  </h1>
</template>

<script>
export default {
  name: "logo",
  props: {
    small: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<style lang="scss">
/*
  * Login logo
  */

.c-logo {
  --logo-direcion: column;
  --icon-width: 60px;
  --icon-height: 60px;
  --logo-icon-size: 3rem;
  --logo-font-size: 4.2rem;
  --logo-letter-space: -1.9px;

  display: flex;
  align-items: center;
  flex-direction: var(--logo-direcion);

  @include mediaTablet {
    --icon-width: 70px;
    --icon-height: 70px;
    --logo-icon-size: 4.2rem;
    --logo-font-size: 5.5rem;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: var(--icon-width);
    height: var(--icon-height);
    margin-bottom: 5px;

    font-size: var(--logo-icon-size);
    border-radius: 50%;
    color: $beige;
    background-color: $orange;
    box-shadow: 2px 2px $darkGreen;
  }

  &__text {
    letter-spacing: var(--logo-letter-space);
    font-size: var(--logo-font-size);
    text-shadow: 2px 2px white;
    color: $darkGreen;
    font-family: $paytone;
    user-select: none;

    em {
      color: $orange;
    }
  }

  /**
  * Small type
  */

  &--small {
    --icon-width: 35px;
    --icon-height: 35px;
    --logo-icon-size: 2rem;
    --logo-direcion: unset;
    --logo-font-size: 3.2rem;
    --logo-letter-space: -1px;

    .c-logo__text {
      display: none;

      @include mediaTablet() {
        display: inline-block;
        margin-left: 10px;
        margin-top: -7px;
      }
    }
  }
}
</style>