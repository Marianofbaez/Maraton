<script setup lang="ts">
import type { Athlete, City } from '../types.d'
import PodiumBadge from './PodiumBadge.vue'
import { ref, watch } from 'vue'
const props = defineProps<{ athletes: Athlete[], cities: City[], cityId: number | null }>()
const emit = defineEmits<{ (e:'edit', id:number): void; (e:'remove', id:number): void; (e:'change-city', id:number | null): void }>()
const model = ref<number | null>(props.cityId ?? 0)
watch(()=>props.cityId, v => { model.value = v ?? 0 })
</script>

<template>
<div>
  <div class="mb-3">
    <label class="mr-2">Filtrar por ciudad:</label>
    <select v-model.number="model" @change="$emit('change-city', model)" class="border rounded-lg px-3 py-2">
      <option :value="0">Todas</option>
    <option v-for="c in cities" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
  </div>
  <table class="w-full">
    <thead>
      <tr class="text-left border-b">
        <th class="py-2">#</th><th>Nombre</th><th>DNI</th><th>Tiempo</th><th>Posición</th><th>Ciudad</th><th class="w-40">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="a in athletes" :key="a.id" class="border-b hover:bg-gray-50">
  <td><PodiumBadge :position="a.position" /></td>
  <td>{{ a.name }}</td>
        <td>{{ a.dni }}</td>
  <td>{{ a.time }}</td>
  <td>{{ a.position }}</td>
  <td>{{ a.city }}</td>
        <td class="space-x-2">
          <button @click="$emit('edit', a.id)" class="border rounded-lg px-2 py-1">Editar</button>
          <button class="bg-red-600 text-white rounded-lg px-2 py-1" @click="$emit('remove', a.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped>
</style>
