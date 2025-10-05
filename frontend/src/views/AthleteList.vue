<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AthleteTable from '../components/AthleteTable.vue'
import { useAthletes } from '../composables/useAthletes'
import { useCities } from '../composables/useCities'

const router = useRouter()
const { filtered, loading: aLoading, error: aError, fetchAll: fetchAthletes, remove, filterCityId } = useAthletes()
const { list: cities, loading: cLoading, error: cError, fetchAll: fetchCities } = useCities()

onMounted(async () => {
  await Promise.all([fetchCities(), fetchAthletes()])
})

function goNew() { router.push({ name:'athlete-new' }) }
function goEdit(id:number) { router.push({ name:'athlete-edit', params:{ id } }) }
async function onRemove(id:number) { if(confirm('¿Eliminar atleta?')) await remove(id) }
function onChangeCity(id: number | null) { filterCityId.value = id && id > 0 ? id : null }
</script>

<template>
<div>
  <div class="mb-3">
    <button class="bg-blue-600 text-white px-3 py-2 rounded-lg" @click="goNew">Nuevo atleta</button>
  </div>
  <div v-if="aLoading || cLoading" class="opacity-80">Cargando...</div>
  <p v-if="aError" class="text-red-600">{{ aError }}</p>
  <p v-if="cError" class="text-red-600">{{ cError }}</p>
  <AthleteTable v-if="!aLoading && !cLoading"
    :athletes="filtered" :cities="cities" :cityId="filterCityId ?? 0"
    @change-city="onChangeCity" @edit="goEdit" @remove="onRemove"
  />
</div>
</template>

<style scoped>
</style>
