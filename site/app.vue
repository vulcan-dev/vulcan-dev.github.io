<template>
  <div class="main-container flex flex-col h-screen min-h-screen">
    <Navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import store from "~/store";
const config = useRuntimeConfig();
store.dispatch("user/checkAuth");

// useHead({
//   meta: [
//     {
//       "http-equiv": "Content-Security-Policy",
//       content: "upgrade-insecure-requests",
//     }
//   ],
// });
</script>
