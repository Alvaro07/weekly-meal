<template>
  <header class="m-header">
    <div class="m-header__wrap">
      <Logo small></Logo>
      <font-awesome-icon icon="sign-out-alt" @click.prevent="logout" class="m-header__logout"/>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
import Button from "./Button";
import Logo from "./Logo";

export default {
  name: "nav-header",
  components: {
    "v-button": Button,
    Logo
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace("login"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss">
.m-header {
  width: 100%;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;

  /**
  * Header wrap container
  */

  &__wrap {
    max-width: 1280px;
    padding: 10px 15px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /**
  * Logout icon
  */
  
  &__logout {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.4rem;
    color: $darkGreen;
    cursor: pointer;
    transition: 0.2s all ease;

    &:hover {
      color: $orange;
    }
  }
}
</style>