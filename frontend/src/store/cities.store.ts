
import { defineStore } from 'pinia'
import { api } from '../composables/useApi'
import type { City } from '../types.d'

export const useCitiesStore = defineStore('cities', {
  state: () => ({
    list: [] as City[],
    loading: false,
    error: '' as string | null
  }),
  actions: {
    async fetchAll() {
      this.loading = true; this.error = null
      try {
        const { data } = await api.get<City[]>('/ciudades')
        this.list = data
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
    async create(payload: { name: string }) {
      this.loading = true; this.error = null
      try {
        const { data } = await api.post<City>('/ciudades', payload)
        this.list.push(data)
        return data
      } catch (e: any) { this.error = e.message; throw e } 
      finally { this.loading = false }
    },
    async update(id: number, payload: { name: string }) {
      this.loading = true; this.error = null
      try {
        const { data } = await api.put<City>(`/ciudades/${id}`, payload)
        const idx = this.list.findIndex(c => c.id === id)
        if (idx !== -1) this.list[idx] = data
        return data
      } catch (e: any) { this.error = e.message; throw e } 
      finally { this.loading = false }
    },
    async remove(id: number) {
      this.loading = true; this.error = null
      try {
        await api.delete(`/ciudades/${id}`)
        this.list = this.list.filter(c => c.id !== id)
      } catch (e: any) { this.error = e.message; throw e } 
      finally { this.loading = false }
    },
    byId(id: number) {
      return this.list.find(c => c.id === id) || null
    }
  }
})
