
import { createRouter, createWebHistory } from 'vue-router'

const AthleteList = () => import('../views/AthleteList.vue')
const AthleteEdit = () => import('../views/AthleteEdit.vue')
const CityList = () => import('../views/CityList.vue')
const CityEdit = () => import('../views/CityEdit.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'athletes', component: AthleteList },
    { path: '/athletes/new', name: 'athlete-new', component: AthleteEdit },
    { path: '/athletes/:id', name: 'athlete-edit', component: AthleteEdit, props: true },
    { path: '/cities', name: 'cities', component: CityList },
    { path: '/cities/new', name: 'city-new', component: CityEdit },
    { path: '/cities/:id', name: 'city-edit', component: CityEdit, props: true },
  ]
})

export default router
