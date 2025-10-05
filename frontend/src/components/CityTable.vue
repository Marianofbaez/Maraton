<script setup lang="ts">
import type { City } from '../types.d'
defineProps<{ cities: City[] }>()
defineEmits<{ (e:'edit', id:number): void; (e:'remove', id:number): void }>()
</script>

<template>
<table class="w-full">
  <thead>
    <tr class="text-left border-b">
      <th class="py-2">ID</th><th>Nombre</th><th class="w-40">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="c in cities" :key="c.id" class="border-b hover:bg-gray-50">
      <td class="py-2">{{ c.id }}</td>
      <td>{{ c.nombre }}</td>
      <td class="space-x-2">
        <button @click="$emit('edit', c.id)" class="border rounded-lg px-2 py-1">Editar</button>
        <button class="bg-red-600 text-white rounded-lg px-2 py-1" @click="$emit('remove', c.id)">Eliminar</button>
      </td>
    </tr>
  </tbody>
</table>
</template>

<style scoped>
</style>
