<template>
  <div class="py-2">
    <input
      class=""
      type="text"
      placeholder="Email" @keyup="clearError" v-model="email">
  </div>

  <div class="py-2">
    <input
      class=""
      type="password"
      placeholder="Password" @keyup="clearError" v-model="password">
  </div>

  <div class="py-2">
    <button class="bg-green-500 p-2 w-full text-white font-bold
      hover:bg-opacity-75" @click="login">
      Login
    </button>
  </div>

  <div :class="{'py-2': error}">
    <p class="text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      error: "",
      email: "",
      password: ""
    }
  },
  mounted() {
    if (this.$store.getters["user/loggedIn"]) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        this.error = "Please fill in all fields";
        return;
      }

      if (!this.isValidEmail(this.email)) {
        this.error = "Please enter a valid email address";
        return;
      }

      this.$store.dispatch("user/login", {
        email: this.email,
        password: this.password
      }).then((data) => {
        if (data.status === "error") {
          this.error = data.message;
          return;
        }

        this.$router.push("/");
      }).catch((error) => {
        this.error = "An error occurred. Please try again later."
      });
    },
    clearError() {
      this.error = "";
    },
    isValidEmail(email) {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    }
  }
}
</script>

<style>
  input {
    border: 1px dotted #ccc;
    background-color: rgba(0, 0, 0, 0);
    padding: 0.1em;
    width: 100%;
  }

  input:focus {
    background-color: rgba(0, 0, 0, 0.0);
    outline: none;
  }
</style>
