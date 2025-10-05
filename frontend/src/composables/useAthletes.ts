
import { storeToRefs } from 'pinia'
import { useAthletesStore } from '../store/athletes.store'

export function useAthletes() {
  const store = useAthletesStore()
  const { filtered, loading, error, filterCityId, list } = storeToRefs(store)
  return {
    filtered, loading, error, filterCityId, list,
    fetchAll: store.fetchAll,
    create: store.create,
    update: store.update,
    remove: store.remove,
    byId: store.byId
  }
}
