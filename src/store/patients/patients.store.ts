import { ActionTree, MutationTree } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import { serialize } from '@/assets/utils'
import {
  State, Patient, ZipCodeData, SearchParams, Mutations, MutationsTypes, Actions, ActionTypes
} from './patients.types'
import api from '../../api'

// State
const patientClear = {
  id: 0,
  name: '',
  lastName: '',
  motherName: '',
  birthDate: '',
  cpf: '',
  cns: '',
  image: '',
  address: {
    zipCode: '',
    streetAdress: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  }
}
const zipCodeDataClear = {
  zipCodeAutoFill: '',
  city: '',
  state: '',
  complement: '',
  streetAdress: '',
  neighborhood: ''
}
const state: State = {
  patients: [],
  patient: patientClear,
  totalPages: 0,
  totalItems: 0,
  zipCodeData: zipCodeDataClear
}

// Mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationsTypes.SET_PATIENTS]: (state: State, patients: Patient[]) => {
    state.patients = patients
  },
  [MutationsTypes.SET_PATIENT]: (state: State, patient: Patient) => {
    state.patient = patient
  },
  [MutationsTypes.SET_TOTAL_PAGES]: (state: State, totalPages: number) => {
    state.totalPages = totalPages
  },
  [MutationsTypes.SET_TOTAL_ITEMS]: (state: State, totalItems: number) => {
    state.totalPages = totalItems
  },
  [MutationsTypes.SET_ZIPCODE_DATA]: (state: State, zipCodeData: ZipCodeData) => {
    state.zipCodeData = zipCodeData
  }
}

// Actions
const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.getPatients]({ commit }, searchParams: SearchParams) {
    const payload = serialize(searchParams)
    return api.get(`/patients?${payload}`)
      .then((resp) => {
        const totalItems: any = Number(resp.headers['x-total-count'])
        const totalPages: any = Math.ceil(totalItems / searchParams._limit)
        console.log('totalPages', totalPages)

        commit(MutationsTypes.SET_PATIENTS, resp.data)
        commit(MutationsTypes.SET_TOTAL_ITEMS, totalItems)
        commit(MutationsTypes.SET_TOTAL_PAGES, totalPages)
      })
  },
  [ActionTypes.registerPatient]({ commit }, patient: Patient) {
    const payload = { patient }

    return api.post('/patients', payload)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Paciente registrado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 3000
        })
      })
  },
  [ActionTypes.editPatient]({ commit }, patient: Patient) {
    const payload = { patient }

    return api.put('/patients', payload)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Paciente editado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
  },
  [ActionTypes.deletePatient]({ commit }, patient: Patient) {
    const payload = { data: { patient } }
    return api.delete(`patients/${patient.id}`, payload)
      .then(() => Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Paciente ${patient.name} excluido com sucesso!`,
        showConfirmButton: false,
        timer: 1500
      }))
      .catch(() => Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Erro ao exclir paciente!',
        showConfirmButton: false,
        timer: 1500
      }))
  },
  [ActionTypes.getZipcodeData]({ commit }, zipCode: string) {
    return axios.get(`https://viacep.com.br/ws/${zipCode.replace(/\D/g, '')}/json/`)
      .then(({ data }) => {
        const {
          localidade, uf, complemento, logradouro, bairro
        } = data
        const zipCodeData = {
          city: localidade,
          state: uf,
          complement: complemento,
          streetAdress: logradouro,
          neighborhood: bairro
        }
        commit(MutationsTypes.SET_ZIPCODE_DATA, zipCodeData)
      })
  },
  [ActionTypes.setPatients]({ commit }) {
    commit(MutationsTypes.SET_PATIENTS, [])
  },
  [ActionTypes.setPatient]({ commit }, patient: Patient) {
    commit(MutationsTypes.SET_PATIENT, patient)
  },
  [ActionTypes.clearPatients]({ commit }) {
    commit(MutationsTypes.SET_PATIENTS, [])
  },
  [ActionTypes.clearPatient]({ commit }) {
    commit(MutationsTypes.SET_PATIENT, patientClear)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
