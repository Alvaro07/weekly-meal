<template>
  <section class="login">
    <Logo></Logo>
    <form class="login__form">
      <InputField placeholder="User name" type="text" v-model="user"></InputField>
      <InputField placeholder="Email" type="text" v-model="email" extraClass="margin-top-20"></InputField>
      <InputField
        type="password"
        extraClass="margin-top-20"
        placeholder="Password"
        v-model="password"
      ></InputField>

      <div v-if="error" class="login__form__error">{{ error }}</div>

      <v-button
        submitType
        text="Create account"
        variant="orange"
        @onClick="createAccount"
        extraClass="margin-top-30 margin-bottom-20"
        icon="user-circle"
      ></v-button>
      <p>
        Do you have an account?
        <br>
        <router-link to="/login" class="bold">Sign up now!</router-link>
      </p>
    </form>
  </section>
</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { database } from "../main";

export default {
  name: "login",
  components: {
    InputField,
    "v-button": Button,
    Logo
  },
  data() {
    return {
      user: null,
      email: null,
      password: null,
      error: null
    };
  },
  computed: mapState(['board']),
  methods: {
    createAccount() {
      this.error = null;

      if (this.user && this.email && this.password) {
        // Check that user exist
        database
          .collection("users")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.data().user.toLowerCase() === this.user.toLowerCase()) {
                this.error = "Error: The user name is already in use by another account.";
              }
            });

            if (this.error) return;

            // Create user
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(user => {
                // Add user to database
                database
                  .collection("users")
                  .add({
                    user: this.user,
                    email: this.email,
                    board: this.board
                  })
                  .then(() => {
                    // Access to dashboard
                    this.$router.push("dashboard");
                  })
                  .catch(error => (this.error = error));
              })
              .catch(error => (this.error = error));
          });
      } else {
        this.error = "Complete all the fields";
      }
    }
  }
};
</script>