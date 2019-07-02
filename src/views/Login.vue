<template>
  <div>
    <form @submit.prevent="login">
      <input type="email" v-model="email">
      <input type="password" v-model="password">
      <button type="submit">Acceder</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
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
          this.$router.push("home");
        })
        .catch(err => (this.error = err.message));
    }
  }
};
</script>

<style lang="scss">
</style>