<script setup lang="ts">

</script>

<template>
<header class="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
  <nav class="space-x-2">
    <RouterLink class="px-2 py-1 rounded hover:bg-gray-100" to="/">Atletas</RouterLink>
    <RouterLink class="px-2 py-1 rounded hover:bg-gray-100" to="/cities">Ciudades</RouterLink>
  </nav>
</header>
<main class="max-w-5xl mx-auto bg-white rounded-xl shadow p-5 mt-6">
  <RouterView />
</main>
</template>

<style scoped>
</style>
