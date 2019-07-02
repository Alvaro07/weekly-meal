<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <span @click.prevent="logout">Log Out</span>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "home",
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
