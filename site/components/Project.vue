<template>
  <div class="p-4 border border-dashed">
    <div class="flex flex-row" v-if="!$store.getters['editing/editing']">
      <div class="left-0 top-0 flex flex-col justify-start w-full gap-2">
        <section class="flex flex-row">
          <h2 class="text-2xl font-bold">{{ project.title }}
            <span v-if="project.tags.length > 0" class="text-sm font-normal text-gray-500">
            {{ project.tags.join(", ") }}
          </span>
          </h2>
        </section>

        <section class="flex flex-col">
          <div v-html="project.body"></div>
        </section>

        <section class="mt-4">
          <div class="flex flex-col">
            <section class="flex flex-row">
              <span class="text-sm font-normal text-gray-500">
                Status: <span class="font-bold">{{ project.status }}</span>
              </span>
            </section>

            <span class="text-sm font-normal text-gray-500">
              Created: <span class="font-bold">{{ timestampToDate(project.created_at) }}</span>
            </span>

            <span v-if="project.created_at !== project.updated_at" class="text-sm font-normal text-gray-500">
              Updated: <span class="font-bold">{{ timestampToDate(project.updated_at) }}</span>
            </span>

            <ul class="list-inside text-green-500 underline gap-3">
              <li v-for="link in project.links" :key="link.id">
                <a :href="link.url">{{ link.name }}</a>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div v-if="$store.getters['editing/editing']" class="flex flex-row gap-3 h-full">
        <button class="text-red-500 font-bold underline">
          Delete
        </button>
      </div>
    </div>

    <!--  Editing  -->
    <div v-else class="editingArea flex flex-col gap-3" v-if="this.$store.getters['user/loggedIn']">
      <div class="flex flex-row gap-3">
        <input class="w-full" type="text" v-model="project.title" placeholder="Project Title">
      </div>

      <div class="flex flex-row gap-3">
        <textarea class="w-full" v-model="project.body" placeholder="Project Description"></textarea>
      </div>

      <!--   Tag Editor   -->
      <div class="flex flex-row gap-3 flex-wrap w-full">
        <div v-for="tag in project.tags" class="tag mr-1 mb-1">
          <span class="text-sm font-normal p-2 border border-dashed h-full">
            {{ tag }}
            <span class="ml-1 cursor-pointer" @click="removeTag(tag)">
              x
            </span>
          </span>
        </div>
        <input class="w-full" type="text" v-model="newTag" placeholder="Tags" @keyup.enter="addTag">
      </div>

      <!-- Link Editor -->
      <div class="flex flex-col gap-3">
        <div v-for="link in project.links" class="tag mr-1 mb-1" v-if="project.links.length > 0">
          <span class="text-sm font-normal p-2 border border-dashed h-full">
            {{ link.name }}: {{ link.url }}
            <span class="ml-1 cursor-pointer" @click="removeLink(link)">
              x
            </span>
          </span>
        </div>
        <div v-else class="text-sm font-normal text-gray-500">
          No links
        </div>

        <div v-if="addingLink" class="flex flex-row gap-3">
          <input class="w-full" type="text" v-model="link.name" placeholder="Link Name">
          <input class="w-full" type="text" v-model="link.url" placeholder="Link URL">
          <button class="text-green-500 font-bold underline" @click="addLink">
            Add
          </button>
          <button class="text-red-500 font-bold underline" @click="cancelLink">
            Cancel
          </button>
        </div>

        <div v-else class="flex flex-row gap-3">
          <button class="p-2 cursor-pointer border border-dashed" @click="addingLink = true">
            Add Link
          </button>
        </div>
      </div>

      <div class="flex flex-row gap-3">
        <input class="w-full" type="text" v-model="project.status" placeholder="Status">
      </div>

      <div class="flex flex-row gap-3">
        <button class="text-red-500 font-bold underline" @click="reset" v-if="!isNew">
          Reset
        </button>

        <button class="text-red-500 font-bold underline" @click="confirming = true" v-if="!isNew">
          Delete
        </button>

        <button class="text-green-500 font-bold underline" @click="stage">
          <span v-if="isNew">
            Add
          </span>
          <span v-else>
            Stage
          </span>
        </button>
      </div>
    </div>
  </div>

  <ConfirmDialog v-if="confirming" :message="`Are you sure you want to delete ${project.title}?`"
                 :confirmDelete="confirmDelete" :cancelDelete="cancelDelete"/>
</template>

<script>
import ConfirmDialog from "~/components/ConfirmDialog.vue"

export default {
  name: "Project",
  components: {
    ConfirmDialog
  },
  props: {
    id: {
      type: [String, Number, null],
      required: true
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      project: {
        title: "Project Title",
        body: "Project Body",
        tags: [],
        links: [],
        status: "Status",
        id: null
      },
      backup: {},
      newTag: "",
      link: {
        name: "",
        url: ""
      },
      addingLink: false,
      confirming: false
    }
  },
  mounted() {
    if (!this.isNew) {
      this.project = this.$store.getters['projects/projects'].find(project => project.id === this.id)
    } else {
      this.project = {
        title: "Project Title",
        body: "Project Body",
        tags: [],
        links: [],
        status: "Status",
        id: null
      }
    }
    this.backup = JSON.parse(JSON.stringify(this.project))
  },
  watch: {
    '$store.getters.user.loggedIn': function (loggedIn) {
      if (loggedIn) return; // We don't care if they logged in
      this.reset()
    }
  },
  methods: {
    reset() {
      this.project = JSON.parse(JSON.stringify(this.backup))
      this.newTag = ""
      this.link = {
        name: "",
        url: ""
      }
      this.addingLink = false
      this.$store.dispatch('projects/unstageProject', this.project)
    },
    deleteProject() {
      this.$store.dispatch('projects/deleteProject', this.project)
      if (this.$store.getters['projects/projects'].length === 0) {
        this.$store.dispatch('editing/setEditing', false)
      }
    },
    stage() {
      if (!this.isNew) {
        if (JSON.stringify(this.project) === JSON.stringify(this.backup)) {
          return
        }

        this.$store.dispatch('projects/stageProject', this.project)
      } else {
        this.$store.dispatch('projects/addProject', this.project)
        this.$store.dispatch('editing/setEditing', false)
        this.$store.dispatch('editing/setCreatingProject', false)
        this.$store.dispatch('projects/getProjects')
      }
    },
    addTag() {
      this.project.tags.push(this.newTag)
      this.newTag = ""
    },
    removeTag(tag) {
      this.project.tags = this.project.tags.filter((t) => t !== tag)
    },
    addLink() {
      if (this.link.name === "" || this.link.url === "") {
        return
      }

      let urlRegex = new RegExp(/^(http|https):\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/)
      if (!urlRegex.test(this.link.url)) {
        return
      }

      this.project.links.push(this.link)
      this.link = {
        name: "",
        url: ""
      }
      this.addingLink = false
    },
    removeLink(link) {
      this.project.links = this.project.links.filter((l) => l !== link)
    },
    cancelLink() {
      this.link = {
        name: "",
        url: ""
      }
      this.addingLink = false
    },
    confirmDelete() {
      this.deleteProject()
      this.confirming = false
    },
    cancelDelete() {
      this.confirming = false
    },
    timestampToDate(timestamp) {
      return new Date(timestamp * 1000).toLocaleString()
    }
  }
}
</script>

<style scoped>
textarea {
  background-color: rgba(0, 0, 0, 0.0);
  border: 1px dotted #ccc;
}

textarea:focus {
  outline: none;
}

input {
  background-color: rgba(0, 0, 0, 0.0);
  border: 1px dotted #ccc;
}

.editingArea > div > input {
  padding: 0.5rem;
}

.editingArea > div > textarea {
  padding: 0.5rem;
  height: 100px;
}
</style>
