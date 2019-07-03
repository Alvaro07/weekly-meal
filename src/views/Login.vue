<template>
  <section class="login">
    <Logo></Logo>
    <form class="login__form">
      <InputField placeholder="Email" type="text" v-model="email"></InputField>
      <InputField
        type="password"
        extraClass="margin-top-20"
        placeholder="Password"
        v-model="password"
      ></InputField>
      <div v-if="error" class="login__form__error">{{ error }}</div>

      <v-button
        text="Access to your menu"
        variant="orange"
        @onClick="login"
        extraClass="margin-top-30 margin-bottom-20"
        icon="hamburger"
      ></v-button>

      <p>
        You do not have an account?
        <br>
        <router-link to="/register" class="bold">Register now!</router-link>
      </p>
    </form>
  </section>
</template>

<script>
import firebase from "firebase";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default {
  name: "login",
  components: {
    InputField,
    "v-button": Button,
    Logo
  },
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
  * Form
  */

  &__form {
    --logo-separation: 30px;

    width: 100%;
    max-width: 250px;
    margin-top: var(--logo-separation);

    @include mediaTablet {
      --logo-separation: 40px;
    }

    &__error {
      color: $orange;
      font-size: 1.4rem;
      font-weight: bold;

      padding-top: 20px;
    }
  }
}
</style>