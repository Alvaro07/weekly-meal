<template>
  <h1 class="logo">
    <span class="logo__icon">
      <font-awesome-icon icon="utensils"/>
    </span>
    <span class="logo__text">
      W<em>ee</em>kly
      M<em>e</em>al
    </span>
  </h1>
</template>

<script>
export default {
  name: "logo"
};
</script>

<style lang="scss" scoped>
/*
  * Login logo
  */

.logo {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__icon {
    --icon-width: 60px;
    --icon-height: 60px;
    --logo-icon-size: 3rem;

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

    @include mediaTablet {
      --icon-width: 70px;
      --icon-height: 70px;
      --logo-icon-size: 4.2rem;
    }
  }

  &__text {
    --logo-font-size: 4.2rem;

    letter-spacing: -1.9px;
    font-size: var(--logo-font-size);
    text-shadow: 2px 2px white;
    color: $darkGreen;
    font-family: $paytone;

    @include mediaTablet {
      --logo-font-size: 5.5rem;
    }

    em {
      color: $orange;
    }
  }
}
</style>