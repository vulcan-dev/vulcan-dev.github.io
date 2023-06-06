<template>
  <nav>
    <div class="flex flex-row justify-between text-green-500 my-2">
      <div class="flex flex-row gap-3">
        <router-link to="/">Home</router-link>
        <router-link to="/projects">Projects</router-link>
        <!--<router-link to="/blog">Blog</router-link>-->
      </div>

      <div class="flex flex-row gap-3">
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <div v-if="isLoggedIn" class="flex flex-row gap-3">
          <button @click="toggleEditing">
            {{ $store.getters['editing/editing'] ? "Cancel" : "Edit" }}
          </button>
          <button
            v-if="$store.getters['editing/editing']"
            :class="{'cursor-not-allowed, text-gray-500': $store.getters['projects/stagedCount'] === 0}"
            :disabled="$store.getters['projects/stagedCount'] === 0"
            @click="save">
            Save
            <span v-if="$store.getters['projects/stagedCount'] > 0" class="text-xs font-bold">({{ $store.getters['projects/stagedCount'] }})</span>
          </button>
        </div>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",

  computed: {
    isLoggedIn() {
      return this.$store.getters.user.loggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
      if (this.$store.getters['editing/editing']) {
        this.$store.dispatch('editing/setCreatingProject', false);
        this.$store.dispatch('editing/setEditing', false);
        this.$store.dispatch('projects/disregardAllStagedChanges');
      }
    },
    save() {
      this.$store.dispatch('projects/saveProjects');
      this.$store.dispatch('editing/setEditing', false);
    },
    toggleEditing() {
      let editing = this.$store.getters['editing/editing'];
      this.$store.dispatch('editing/setEditing', !editing);
      this.$store.dispatch('editing/setCreatingProject', false);
    }
  }
}
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}

button:hover {
  text-decoration: underline;
}
</style>
