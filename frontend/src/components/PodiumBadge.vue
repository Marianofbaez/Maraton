<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ position: number }>()
const medal = computed(() => ({1:'🥇 1°',2:'🥈 2°',3:'🥉 3°'} as Record<number,string>)[props.position])
const podiumClass = computed(() => ({1:'bg-yellow-50 border-yellow-300',2:'bg-indigo-50 border-indigo-300',3:'bg-amber-50 border-amber-300'} as Record<number,string>)[props.position])
</script>

<template>
<span v-if="position<=3" class="inline-block text-xs px-2 py-0.5 rounded-full border" :class="podiumClass">{{ medal }}</span>
</template>

<style scoped>
</style>
