import { createRouter, createWebHistory } from 'vue-router'
import BrowserStorage from '@/assets/utils/browser-storage'
import { getters } from '@/store/auth/auth.store'
import vuex from '@/store'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next): Promise<boolean> => {
  const token = BrowserStorage.get('token')
  const hasUserData = getters.hasUserData()

  if (token && to.name === 'Login') {
    next({ name: 'Home' })
    return true
  }
  if (!to.meta.permission) {
    next()
    return true
  }
  if (token && !hasUserData && to.name !== 'Login') {
    await vuex.dispatch('authStore/GET_ME')
      .catch((error) => {
        BrowserStorage.remove('token')
        next({ name: 'Login' })
      })
  }

  const hasPermission = getters.hasRoutePermission(String(to.meta.permission))
  const hasAction = getters.hasAction(String(to.meta.action))

  document.title = `${to.meta.title} - OM30`
  if (token && from.name === 'Login' && to.name === 'Home') {
    next()
    return true
  }
  if (!token && to.name !== 'Login') {
    next({ name: 'Login' })
    return true
  }
  if (token && !hasPermission && !hasAction && !from.name && from.path !== '/') {
    next({ name: 'Home' })
    return true
  }
  if (token && to.name === 'Home') {
    next()
    return true
  }
  if (token && hasPermission && hasAction && to.name !== 'Login') {
    next()
    return true
  }
  return false
})

export default router
