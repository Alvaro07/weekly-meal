<template>
  <div>
    <form @click.prevent="login">
      <input type="text" v-model="user">
      <input type="email">
      <button type="submit">Acceder</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: null,
      email: null
    }
  },
  methods: {
    login() {
      console.log(this.user)
    }
  }
};
</script>

<style lang="scss">
</style>