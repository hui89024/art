import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CollectiblesView from '../views/CollectiblesView.vue'
import PatternLibraryView from '../views/PatternLibraryView.vue'
import EventsView from '../views/EventsView.vue'
import AppDownloadView from '../views/AppDownloadView.vue'
import ContactView from '../views/ContactView.vue'
import { getStoredAuth } from '../services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/collectibles',
      name: 'collectibles',
      component: CollectiblesView
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView
    },
    {
      path: '/app',
      name: 'app-download',
      component: AppDownloadView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/pattern-library',
      name: 'pattern-library',
      component: PatternLibraryView,
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    return { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.meta?.requiresAuth) {
    const { token } = getStoredAuth()
    if (!token) {
      return '/'
    }
  }

  return true
})

export default router