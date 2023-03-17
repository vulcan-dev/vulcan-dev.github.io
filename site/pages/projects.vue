<template>
  <div class="py-2">
    <h1 class="text-3xl font-bold">Projects</h1>
    <p class="text-xl">Here are some of my projects</p>

    <div class="py-2" v-if="isLoggedIn && $store.getters['editing/editing']">
      <button class="p-2 w-full text-white font-bold border border-dashed
        hover:bg-opacity-75" @click="$store.dispatch('editing/setCreatingProject', true)">
        +
      </button>
    </div>

    <div v-if="$store.getters['editing/creatingProject']">
      <Project
          :isNew="true"
      ></Project>
    </div>
    <div v-else class="py-2 flex flex-col gap-4">
      <ul class="flex flex-col gap-4">
        <li v-for="project in projects" :key="project.id">
          <div v-if="expanded.includes(project.id)" class="flex flex-col gap-4">
            <Project
                :id="project.id"
                :isNew="false"
            ></Project>

            <button @click="expanded = expanded.filter(id => id !== project.id)"
                    class="p-2 text-white font-bold border border-dashed hover:border-green-500"
                    v-if="!$store.getters['editing/editing']">
              Collapse
            </button>
          </div>

          <div v-else class="flex flex-row w-full gap-4 border border-dashed items-center p-2
            hover:cursor-pointer hover:border-green-500"
               @click="expanded.push(project.id)">
            <h2 class="text-xl font-bold">{{ project.title }}</h2>
            <div v-html="project.body"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "projects",
  mounted() {
    this.loadProjects()
  },
  data() {
    return {
      expanded: [],
    }
  },
  computed: {
    isLoggedIn() {
      let loggedIn = this.$store.getters.user.loggedIn
      console.log('isLoggedIn: ', loggedIn)
      return this.$store.getters.user.loggedIn;
    },
    projects() {
      return this.$store.getters['projects/projects']
    }
  },
  watch: {
    projects() {
      if (process.env.NODE_ENV === 'development') {
        if (this.projects == null) {
          this.$store.dispatch('editing/setEditing', false)
        } else {
          console.log('projects updated: ', this.projects)
        }
      }
    }
  },
  methods: {
    loadProjects() {
      this.$store.dispatch('projects/getProjects')
    },
  }
}
</script>

<style scoped>

</style>
