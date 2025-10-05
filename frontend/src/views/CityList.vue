<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CityTable from '../components/CityTable.vue'
import { useCities } from '../composables/useCities'

const router = useRouter()
const { list, loading, error, fetchAll, remove } = useCities()
onMounted(() => fetchAll())
function goNew() { router.push({ name: 'city-new' }) }
function goEdit(id:number) { router.push({ name: 'city-edit', params:{ id } }) }
async function onRemove(id:number) { if(confirm('¿Eliminar ciudad?')) await remove(id) }
</script>

<template>
<div>
  <div class="mb-3">
    <button class="bg-blue-600 text-white px-3 py-2 rounded-lg" @click="goNew">Nueva ciudad</button>
  </div>
  <div v-if="loading" class="opacity-80">Cargando...</div>
  <p v-if="error" class="text-red-600">{{ error }}</p>
  <CityTable v-if="!loading" :cities="list" @edit="goEdit" @remove="onRemove" />
</div>
</template>

<style scoped>
</style>
