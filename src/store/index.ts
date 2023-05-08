import { createStore } from 'vuex'
import authStore from './auth/auth.store'
import patientsStore from './patients/patients.store'

export default createStore({
  modules: { authStore, patientsStore }
})
