<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { City, Athlete, AthleteInput } from '../types.d'
const props = defineProps<{
  modelValue?: Athlete | null,
  cities: City[],
  existingDni: number[]
}>()
const emit = defineEmits<{ (e:'submit', v:AthleteInput): void; (e:'cancel'): void }>()

const dni = ref<number | null>(props.modelValue?.dni ?? null)
const nombre = ref(props.modelValue?.nombre ?? '')
const tiempo = ref(props.modelValue?.tiempo ?? '')
const posicion = ref<number | null>(props.modelValue?.posicion ?? null)
const ciudadId = ref<number>(props.modelValue?.ciudad?.id ?? 0)

watch(()=>props.modelValue, (m)=>{
  dni.value = m?.dni ?? null
  nombre.value = m?.nombre ?? ''
  tiempo.value = m?.tiempo ?? ''
  posicion.value = m?.posicion ?? null
  ciudadId.value = m?.ciudad?.id ?? 0
})

const saving = ref(false)
const errs = ref<string[]>([])
const timeRegex = /^\d+h \d{2}m \d{2}s$/

const isValid = computed(() => {
  errs.value = []
  if(!dni.value || isNaN(dni.value)) errs.value.push('DNI inválido')
  if(!nombre.value) errs.value.push('Nombre es obligatorio')
  if(!tiempo.value || !timeRegex.test(tiempo.value)) errs.value.push('Tiempo con formato "2h 07m 30s"')
  if(!posicion.value || posicion.value <= 0) errs.value.push('Posición debe ser > 0')
  if(!ciudadId.value) errs.value.push('Debe seleccionar ciudad')
  if(dni.value) {
    const editingId = props.modelValue?.id
    const dup = props.existingDni.filter(d => d === dni.value)
    if(dup.length && (editingId == null || props.modelValue?.dni !== dni.value)) errs.value.push('DNI ya existe')
  }
  return errs.value.length === 0
})

async function onSubmit() {
  if(!isValid.value) return
  saving.value = true
  try {
    emit('submit', { dni: Number(dni.value), nombre: nombre.value, tiempo: tiempo.value, posicion: Number(posicion.value), ciudadId: Number(ciudadId.value) })
  } finally { saving.value = false }
}
</script>

<template>
<form @submit.prevent="onSubmit" class="space-y-3">
  <div class="grid grid-cols-[160px_1fr] gap-3 items-center">
    <label>DNI</label>
    <input v-model.number="dni" type="number" min="1" class="border rounded-lg px-3 py-2" placeholder="Ej: 30123456" />
  </div>
  <div class="grid grid-cols-[160px_1fr] gap-3 items-center">
    <label>Nombre</label>
    <input v-model.trim="nombre" type="text" required class="border rounded-lg px-3 py-2" placeholder="Nombre y apellido" />
  </div>
  <div class="grid grid-cols-[160px_1fr] gap-3 items-center">
    <label>Tiempo</label>
    <input v-model.trim="tiempo" type="text" class="border rounded-lg px-3 py-2" placeholder="2h 07m 30s" />
  </div>
  <div class="grid grid-cols-[160px_1fr] gap-3 items-center">
    <label>Posición</label>
    <input v-model.number="posicion" type="number" min="1" class="border rounded-lg px-3 py-2" />
  </div>
  <div class="grid grid-cols-[160px_1fr] gap-3 items-center">
    <label>Ciudad</label>
    <select v-model.number="ciudadId" class="border rounded-lg px-3 py-2">
      <option :value="0" disabled>Seleccione ciudad</option>
      <option v-for="c in cities" :key="c.id" :value="c.id">{{ c.nombre }}</option>
    </select>
  </div>
  <ul v-if="errs.length" class="text-red-600 text-sm list-disc pl-5">
    <li v-for="e in errs" :key="e">{{ e }}</li>
  </ul>
  <div class="flex gap-2 justify-end">
    <button type="button" @click="$emit('cancel')" class="border rounded-lg px-3 py-2">Cancelar</button>
    <button class="rounded-lg px-3 py-2 text-white disabled:opacity-60" :class="isValid ? 'bg-blue-600' : 'bg-gray-400'" type="submit" :disabled="saving || !isValid">Guardar</button>
  </div>
</form>
</template>

<style scoped>
</style>
