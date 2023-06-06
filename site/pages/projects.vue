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
          <!-- Expanded -->
          <div v-if="expanded.includes(project.id)" class="flex flex-col gap-4">
            <Project
                :id="project.id"
                :isNew="false"
            ></Project>

            <button @click="expanded = expanded.filter(id => id !== project.id)"
                    class="p-2 text-white font-bold border border-dashed hover:border-green-500">
              Collapse
            </button>
          </div>

          <!-- Collapsed -->
          <div v-else class="flex flex-row w-full gap-4 border border-dashed items-center p-2
            hover:cursor-pointer hover:border-green-500"
               @click="expanded.push(project.id)">
            <h2 class="text-xl font-bold">{{ project.title }}</h2>
            <div v-html="project.body"></div>
          </div>
        </li>
      </ul>
    </div>

    <!--  Markdown test  -->
  </div>
</template>

<script>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

useHead({
  title: "Projects · Daniel W",
})

export default {
  name: "projects",
  mounted() {
    this.$store.dispatch('projects/getProjects')
  },
  // set title again once the page is loaded
  updated() {
    useHead({
      title: "Projects · Daniel W",
    })
  },
  data() {
    return {
      expanded: [],
      testMarkdown: "# Hello, World!"
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/loggedIn']
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
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
