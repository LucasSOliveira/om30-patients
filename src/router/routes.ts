import { RouteRecordRaw } from 'vue-router'

export const authRoutesChildren = [
  {
    path: '',
    name: 'Home',
    meta: {
      title: 'Home',
      permission: 'HOME',
      action: 'HOME_VIEW',
      showInMenu: true
    },
    component: () =>
      import(
        /* webpackChunkName: "Home" */
        '../pages/home/Home.vue'
      )
  },
  {
    path: '/patients',
    name: 'Patients',
    meta: {
      title: 'Pacientes',
      permission: 'PATIENTS',
      action: 'PATIENTS_VIEW',
      showInMenu: true
    },
    component: () =>
      import(
        /* webpackChunkName: "Patients" */
        '../pages/patients/Patients.vue'
      )
  },
  {
    path: '/patients/create',
    name: 'CreatePatient',
    meta: {
      title: 'Registro de paciente',
      permission: 'PATIENTS',
      action: 'PATIENTS_CREATE',
      showInMenu: false
    },
    component: () =>
      import(
        /* webpackChunkName: "CreatePatient" */
        '../pages/patients/modules/PatientsForm.vue'
      )
  },
  {
    path: '/patients/edit/:cpf',
    name: 'EditPatient',
    meta: {
      title: 'Editar paciente',
      permission: 'PATIENTS',
      action: 'PATIENTS_EDIT',
      showInMenu: false
    },
    component: () =>
      import(
        /* webpackChunkName: "EditPatient" */
        '../pages/patients/modules/PatientsForm.vue'
      )
  },
  {
    path: '/patients/data/:cpf',
    name: 'PatientData',
    meta: {
      title: 'Dados do paciente',
      permission: 'PATIENTS',
      action: 'PATIENTS_VIEW',
      showInMenu: false
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientData" */
        '../pages/patients/modules/PatientData.vue'
      )
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: '/404',
    component: () => import('../pages/auth/404.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/auth/Login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/',
    component: () => import('../pages/Base.vue'),
    children: authRoutesChildren
  }
]

export default routes
