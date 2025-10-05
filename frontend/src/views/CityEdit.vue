<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CityForm from '../components/CityForm.vue'
import { useCities } from '../composables/useCities'

const { params } = useRoute()
const router = useRouter()
const id = computed(()=> Number(params.id))
const isEdit = computed(()=> !!params.id)

const { list, loading, error, fetchAll, create, update, byId } = useCities()
const model = ref<{ name: string } | null>(null)

onMounted(async () => {
  if(!list.value.length) await fetchAll()
  if(isEdit.value) {
    const c = byId(id.value)
    if(c) model.value = { name: c.name }
  } else {
    model.value = { name: '' }
  }
})

async function onSubmit(payload:{ name:string }) {
  if(isEdit.value) await update(id.value, payload)
  else await create(payload)
  goList()
}
function goList(){ router.push({ name:'cities' }) }
</script>

<template>
<div>
  <h2 class="mt-0 text-xl font-semibold">{{ isEdit ? 'Editar ciudad' : 'Nueva ciudad' }}</h2>
  <div v-if="loading" class="opacity-80">Cargando...</div>
  <p v-if="error" class="text-red-600">{{ error }}</p>
  <CityForm v-if="!loading" :modelValue="model" @submit="onSubmit" @cancel="goList" />
</div>
</template>

<style scoped>
</style>
