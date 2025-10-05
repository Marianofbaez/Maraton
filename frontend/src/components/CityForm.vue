<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
const props = defineProps<{ modelValue?: { name: string } | null }>()
const emit = defineEmits<{ (e:'submit', v:{ name:string }): void; (e:'cancel'): void }>()

const nameVal = ref(props.modelValue?.name ?? '')
watchEffect(()=>{ if(props.modelValue) nameVal.value = props.modelValue.name })

const saving = ref(false)
const error = ref<string | null>(null)

const valid = computed(()=> nameVal.value.length>=1 && nameVal.value.length <= 80)

async function onSubmit() {
  error.value = null
  if(!valid.value) return
  saving.value = true
  try {
    emit('submit', { name: nameVal.value })
  } catch(e:any){ error.value = e.message } finally { saving.value = false }
}
</script>

<template>
<form @submit.prevent="onSubmit" class="space-y-3">
  <div class="grid grid-cols-[160px_1fr] gap-3 items-center">
    <label>Nombre</label>
    <input v-model.trim="nameVal" type="text" maxlength="80" required placeholder="Nombre de la ciudad"
           class="border rounded-lg px-3 py-2"/>
  </div>
  <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
  <div class="flex gap-2 justify-end">
    <button type="button" @click="$emit('cancel')" class="border rounded-lg px-3 py-2">Cancelar</button>
    <button class="rounded-lg px-3 py-2 text-white disabled:opacity-60"
            :class="valid ? 'bg-blue-600' : 'bg-gray-400'"
            type="submit" :disabled="saving || !valid">Guardar</button>
  </div>
</form>
</template>

<style scoped>
</style>
