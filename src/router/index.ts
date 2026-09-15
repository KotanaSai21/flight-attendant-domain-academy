import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    {
      path: '/learn',
      name: 'learning-center',
      component: () => import('../views/LearningCenterView.vue'),
    },
    {
      path: '/learn/:id',
      name: 'module',
      component: () => import('../views/ModuleView.vue'),
    },
    { path: '/dictionary', name: 'dictionary', component: () => import('../views/DictionaryView.vue') },
    // Bidding content now lives in the Learn path (modules 4-8).
    { path: '/bidding', redirect: { name: 'module', params: { id: 'bid-month-overview' } } },
    { path: '/simulator', name: 'simulator', component: () => import('../views/SimulatorView.vue') },
    { path: '/map', name: 'domain-map', component: () => import('../views/DomainMapView.vue') },
    { path: '/search', name: 'search', component: () => import('../views/SearchView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
