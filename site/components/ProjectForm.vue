<template>
  <div class="py-2">
    <input
      class="w-full"
      type="text"
      v-model="title"
      placeholder="Title">
  </div>

  <div class="py-2">
    <textarea
      class="w-full"
      v-model="content"
      placeholder="Content"></textarea>
  </div>

  <div class="py-2">
    <!--  Tag area  -->
    <div class="flex flex-wrap">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="tag mr-1 mb-1 p-1">
        {{ tag }}
        <span
          class="ml-1 cursor-pointer"
          @click="tags.splice(index, 1)">
          x
        </span>
      </div>
    </div>

    <input
      class="w-full"
      type="text"
      v-model="tag"
      placeholder="Tags"
      @keyup.enter="tags.push(tag); tag = ''">
  </div>

  <div class="py-2">
    <div class="flex flex-wrap">
      <div
        v-for="(link, index) in links"
        :key="index"
        class="tag mr-1 mb-1 p-1">
        {{ link.name }}: {{ link.url }}
        <span
          class="ml-1 cursor-pointer"
          @click="links.splice(index, 1)">
          x
        </span>
      </div>
    </div>

    <div class="flex flex-col">
      <input
        class="w-full"
        type="text"
        v-model="link.name"
        placeholder="Link Name">
      <input
        class="w-full"
        type="text"
        v-model="link.url"
        placeholder="Link URL"
        @keyup.enter="links.push(link); link = {}">
    </div>
  </div>

  <div class="py-2 flex flex-row">
    <button
        class="bg-red-500 p-2 w-full text-white font-bold
        hover:bg-opacity-75"
        @click="close(false)">
      Cancel
    </button>

    <button
      class="bg-green-500 p-2 w-full text-white font-bold
        hover:bg-opacity-75"
      @click="submit">
      Submit
    </button>
  </div>

  <!-- Error -->
  <div :class="{'py-2': error}">
    <p class="text-red-500">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "ProjectForm",
  props: {
    close: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      links: {},
      tag: "",
      link: {},
      error: ""
    }
  },
  methods: {
    submit() {
      if (!this.title || !this.content) {
        this.error = "Please fill in all fields";
        return;
      }

      // Write tags as a string array: ["tag1", "tag2", "tag3"]
      this.tags = this.tags.join(", ");

      this.$store.dispatch('projects/createProject', {
        title: this.title,
        content: this.content,
        tags: "",
        links: "",
        state: 0
      }).then((data) => {
        this.close(true);
      }).catch((error) => {
        console.log("error: ", error)
      });
    }
  }
}
</script>

<style scoped>
  textarea {
    resize: none;
    background-color: rgba(0, 0, 0, 0.0);
    border: 1px dotted #ccc;
  }

  textarea:focus {
    outline: none;
  }

  .tag {
    background-color: rgba(0, 0, 0, 0.0);
    border: 1px dotted #ccc;
  }
</style>
