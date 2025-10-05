
import { storeToRefs } from 'pinia'
import { useCitiesStore } from '../store/cities.store'

export function useCities() {
  const store = useCitiesStore()
  const { list, loading, error } = storeToRefs(store)
  return {
    list, loading, error,
    fetchAll: store.fetchAll,
    create: store.create,
    update: store.update,
    remove: store.remove,
    byId: store.byId
  }
}
