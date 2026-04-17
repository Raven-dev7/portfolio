import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProjectDetails from '../pages/ProjectDetails.vue'
import AllProjects from '../pages/AllProjects.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'AllProjects',
    component: AllProjects
  },
  {
    path: '/project/:id',
    name: 'ProjectDetails',
    component: ProjectDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // Handle section scrolling via query param
    if (to.query.section) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const el = document.getElementById(to.query.section)
          if (el) {
            resolve({ el, behavior: 'smooth' })
          } else {
            resolve({ top: 0 })
          }
        }, 100)
      })
    }
    return { top: 0 }
  }
})

export default router
