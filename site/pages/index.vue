<template>
  <div class="py-2">
    <div>
      <h2 class="text-3xl font-bold">Hello! I'm Daniel W</h2>
      <p class="text-lg">An experienced software developer with expertise in programming in C, C++ and Go. I have a strong interest in game engine development, general-purpose software, and reverse engineering.</p>
    </div>

    <div class="py-2">
      <h2 class="text-2xl font-bold">Skills</h2>
      <ul class="list-disc list-inside p-2">
        <li>Proficient in programming languages such as C, C++ and Go.</li>
        <li>Specializes in creating general-purpose software, and reverse engineering.</li>
        <li>Passionate about creating software that provides a seamless user experience and makes life easier for others.</li>
        <li>Adept at using C-style programming and preferring structs and functions over classes.</li>
        <li>Currently learning DirectX to expand my capabilities and create more impressive software.</li>
      </ul>

      <p class="text-lg">Overall, I am a dedicated and skilled software developer with a passion for creating software that meets the needs of others. My experience in game engine development, general-purpose software, and reverse engineering has helped me develop a strong understanding of software development and a keen eye for detail.</p>
    </div>

    <!--  Test Markdown  -->
<!--    <ContentSlot :use="$slots.default" unwrap="true">-->
<!--      # Hello, World!-->
<!--    </ContentSlot>-->
  </div>
</template>

<script>
useHead({
  title: "Home · Daniel W",
})

export default {
  name: "HomePage",
  updated() {
    useHead({
      title: "Home · Daniel W",
    })
  },
}
</script>
