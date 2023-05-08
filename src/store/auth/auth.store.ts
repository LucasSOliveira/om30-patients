import { ActionTree, MutationTree } from 'vuex'
import {
  User, State, Mutations, MutationsTypes, ActionTypes, Actions, Getters
} from './auth.types'
import { authRoutesChildren } from '../../router/routes'
import BrowserStorage from '../../assets/utils/browser-storage'
import api from '../../api'

// State
const userClear: User = {
  id: 0,
  name: '',
  email: '',
  hasAuthorization: false,
  role: {
    id: 0,
    name: '',
    role: '',
    routesPermission: [ '' ],
    actions: [ '' ]
  },
  menuNavigation: [
    {
      name: '',
      title: '',
      permission: ''
    }
  ]
}
export const state: State = {
  user: userClear
}

// Mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationsTypes.SET_CURRENT_USER]: (state: State, user: User) => {
    state.user = user
  }
}

// Actions
const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.getMe]({ commit }) {
    return api.get('/me')
      .then(({ data }) => {
        const token = BrowserStorage.get('token')
        if (!token) {
          const errorMessage = 'Refaça o login'

          Promise.reject(errorMessage)
          return
        }
        const routesPermission = data.userLogged?.role.routesPermission
        const authRoutes = authRoutesChildren.filter((item) => routesPermission.includes(item?.meta?.permission) && item.meta.showInMenu)
        const menuNavigation = authRoutes.map(({ meta, name }) => ({ name, ...meta }))
        const hasAuthorization = true

        commit(MutationsTypes.SET_CURRENT_USER, { ...data.userLogged, hasAuthorization, menuNavigation })
      })
  },
  [ActionTypes.clearUser]({ commit }) {
    BrowserStorage.remove('token')
    commit(MutationsTypes.SET_CURRENT_USER, userClear)
  },
  [ActionTypes.login]({ commit }, { email, password }: { email: string, password: string}) {
    return api.post('/login', { email, password })
      .then(({ data }) => {
        const token = data?.access_token

        if (!token) {
          return Promise.reject(new Error('E-mail ou senha inválido!'))
        }
        BrowserStorage.set('token', token)
        return data
      })
  }

}

// Getters
export const getters: Getters = {
  hasRoutePermission: (permission): boolean => state.user.role.routesPermission.some(item => item === permission),
  hasAction: (action): boolean => state.user.role.actions.some(item => item === action),
  hasUserData: () => state.user.hasAuthorization,
  user: () => state.user
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
