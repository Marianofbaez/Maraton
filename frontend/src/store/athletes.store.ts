import { defineStore } from 'pinia'
import { api } from '../composables/useApi'
import type { Athlete, AthleteInput } from '../types.d'
import { useCitiesStore } from './cities.store'

export const useAthletesStore = defineStore('athletes', {
  state: () => ({
    list: [] as Athlete[],
    loading: false,
    error: '' as string | null,
    filterCityId: null as number | null
  }),
  getters: {
    filtered(state) {
      const rows = [...state.list].sort((a,b)=>a.position-b.position)
      if (!state.filterCityId) return rows
      const citiesStore = useCitiesStore()
      const city = citiesStore.list.find(c => c.id === state.filterCityId)
      if (!city) return rows
      return rows.filter(a =>
        (typeof a.city === 'string' && a.city === city.name) ||
        (a.city && typeof a.city === 'object' && a.city.id === state.filterCityId)
      )
    }
  },
  actions: {
    async fetchAll() {
      this.loading = true; this.error = null
      try {
        const { data } = await api.get<Athlete[]>('/atletas')
        this.list = data
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
    async create(payload: AthleteInput) {
      this.loading = true; this.error = null
      try {
       const send: any = {
          dni: payload.dni,
          name: payload.name,
          time: payload.time,
          position: payload.position
        }
        if (payload.cityId && Number(payload.cityId) > 0) send.cityId = Number(payload.cityId)
        const { data } = await api.post<Athlete>('/atletas', send)
        this.list.push(data)
        return data
      } catch (e: any) { this.error = e.message; throw e } 
      finally { this.loading = false }
    },
    async update(id: number, payload: AthleteInput) {
      this.loading = true; this.error = null
      try {
        const send: any = {
          dni: payload.dni,
          name: payload.name,
          time: payload.time,
          position: payload.position
        }
        if (payload.cityId && Number(payload.cityId) > 0) send.cityId = Number(payload.cityId)
        const { data } = await api.put<Athlete>(`/atletas/${id}`, send)
        const idx = this.list.findIndex(c => c.id === id)
        if (idx !== -1) this.list[idx] = data
        return data
      } catch (e: any) { this.error = e.message; throw e } 
      finally { this.loading = false }
    },
    async remove(id: number) {
      this.loading = true; this.error = null
      try {
        await api.delete(`/atletas/${id}`)
        this.list = this.list.filter(c => c.id !== id)
      } catch (e: any) { this.error = e.message; throw e } 
      finally { this.loading = false }
    },
    byId(id: number) {
      return this.list.find(c => c.id === id) || null
    }
  }
})
