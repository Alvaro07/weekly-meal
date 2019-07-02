<template>
  <section class="login">
    <h1 class="login__logo">
      <span class="login__logo__icon">
        <font-awesome-icon icon="utensils"/>
      </span>
      <span class="login__logo__text">
        W
        <em>ee</em>kly M
        <em>e</em>al
      </span>
    </h1>

    <!-- <form @submit.prevent="login">
        <input type="email" v-model="email">
        <input type="password" v-model="password">
        <button type="submit">Acceder</button>
      </form>
    <div v-if="error">{{ error }}</div>-->
  </section>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      error: null
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push("dashboard");
        })
        .catch(err => (this.error = err.message));
    }
  }
};
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  text-align: center;
  padding: 15px;

  /*
  * Login logo
  */

  &__logo {
    --logo-font-size: 4.2rem;

    display: flex;
    align-items: center;

    color: $darkGreen;
    font-family: $paytone;
    letter-spacing: -1.9px;
    font-size: var(--logo-font-size);
    text-shadow: 1px 1px white;
    margin-bottom: var(--logo-margin);

    @include mediaTablet {
      --logo-font-size: 5.5rem;
    }

    &__icon {
      --icon-width: 60px;
      --icon-height: 60px;
      --logo-icon-size: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      width: var(--icon-width);
      height: var(--icon-height);
      margin-right: 10px;

      font-size: var(--logo-icon-size);
      border-radius: 50%;
      color: $beige;
      background-color: $orange;

      @include mediaTablet {
        --icon-width: 70px;
        --icon-height: 70px;
        --logo-icon-size: 4.2rem;
      }
    }

    &__text {
      em {
        color: $orange;
        display: inline-block;
      }
    }
  }
}
</style>