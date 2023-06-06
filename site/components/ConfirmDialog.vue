<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden">
    <div class="backdrop-filter backdrop-blur-lg absolute inset-0 z-10"></div>
    <div class="border border-dashed rounded-lg p-8 z-20">
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-center gap-4">
        <button class="p-2 cursor-pointer border border-dashed w-full hover:bg-green-500" @click="confirmDelete">
          Yes
        </button>

        <button class="p-2 cursor-pointer border border-dashed w-full hover:bg-green-500" @click="cancelDelete">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    message: {
      type: String,
      required: true
    },
    confirmDelete: {
      type: Function,
      required: true
    },
    cancelDelete: {
      type: Function,
      required: true
    }
  },
}
</script>

<style scoped>
html {
    overflow: hidden;
}

.backdrop-filter {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}
</style>
