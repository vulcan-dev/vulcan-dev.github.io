<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
    <div class="border border-dashed bg-slate-600 rounded-lg p-8">
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-center gap-4">
        <button class="p-2 cursor-pointer border border-dashed w-full hover:bg-slate-500" @click="confirmDelete">
          Yes
        </button>

        <button class="p-2 cursor-pointer border border-dashed w-full hover:bg-slate-500" @click="cancelDelete">
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

</style>
