<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AthleteForm from '../components/AthleteForm.vue'
import { useAthletes } from '../composables/useAthletes'
import { useCities } from '../composables/useCities'
import type { AthleteInput } from '../types.d'

const route = useRoute()
const router = useRouter()

const id = computed(()=> Number(route.params.id))
const isEdit = computed(()=> !!route.params.id)

const { list, byId, fetchAll, create, update, loading: aLoading, error: aError } = useAthletes()
const { list: cities, fetchAll: fetchCities, loading: cLoading, error: cError } = useCities()

onMounted(async () => {
  if(!cities.value.length) await fetchCities()
  if(!list.value.length) await fetchAll()
})

const athlete = computed(()=> isEdit.value ? byId(id.value) : null)
const existingDni = computed(()=> list.value.map(a => a.dni))

async function onSubmit(payload: AthleteInput) {
  if(isEdit.value) await update(id.value, payload)
  else await create(payload)
  goList()
}
function goList(){ router.push({ name:'athletes' }) }
</script>

<template>
<div>
  <h2 class="mt-0 text-xl font-semibold">{{ isEdit ? 'Editar atleta' : 'Nuevo atleta' }}</h2>
  <div v-if="aLoading || cLoading" class="opacity-80">Cargando...</div>
  <p v-if="aError" class="text-red-600">{{ aError }}</p>
  <p v-if="cError" class="text-red-600">{{ cError }}</p>
  <AthleteForm v-if="!aLoading && !cLoading"
    :modelValue="athlete"
    :cities="cities"
    :existingDni="existingDni"
    @submit="onSubmit"
    @cancel="goList"
  />
</div>
</template>

<style scoped>
</style>
