import { ActionContext } from 'vuex'

// State types
export type Patient = {
    id: number,
    name: string,
    lastName: string,
    motherName: string,
    birthDate: string,
    cpf: string,
    cns: string,
    image: string,
    address: {
      zipCode: string,
      streetAdress: string,
      number: string,
      complement: string,
      neighborhood: string,
      city: string,
      state: string
    }
  }
export type ZipCodeData = {
    zipCodeAutoFill: string,
    city: string,
    state: string,
    complement: string,
    streetAdress: string,
    neighborhood: string
}
export type SearchParams = {
    _page: number,
    _limit: number,
    _sort: string,
    _order: string
}
export interface State { patients: Patient[], patient: Patient, zipCodeData: ZipCodeData, totalPages: number, totalItems: number}

// Mutations types
export enum MutationsTypes {
    SET_PATIENTS = 'SET_PATIENTS',
    SET_PATIENT = 'SET_PATIENT',
    SET_ZIPCODE_DATA = 'SET_ZIPCODE_DATA',
    SET_TOTAL_PAGES = 'SET_TOTAL_PAGES',
    SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS'
}

export type Mutations<S = State> = {
    [MutationsTypes.SET_PATIENTS](state: S, patients: Patient[]): void,
    [MutationsTypes.SET_PATIENT](state: S, patient: Patient): void,
    [MutationsTypes.SET_ZIPCODE_DATA](state: S, ZipCodeData: ZipCodeData): void,
    [MutationsTypes.SET_TOTAL_PAGES](state: S, totalPages: number): void,
    [MutationsTypes.SET_TOTAL_ITEMS](state: S, totalItems: number): void,
}

// Actions types
export enum ActionTypes {
    getPatients = 'GET_PATIENTS',
    getZipcodeData = 'GET_ZIPCODE_DATA',
    registerPatient = 'REGISTER_PATIENT',
    editPatient = 'EDIT_PATIENT',
    deletePatient = 'DELETE_PATIENT',
    setPatients = 'SET_PATIENTS',
    setPatient = 'SET_PATIENT',
    setZipcodeData = 'SET_ZIPCODE_DATA',
    clearPatients = 'CLEAR_PATIENTS',
    clearPatient = 'CLEAR_PATIENT',
  }

export type SetPatientsCommitActionContext = {
    commit<k extends keyof Mutations>(
        key: k,
        user: Parameters<Mutations[k]>,
    ):ReturnType<Mutations[k]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
    [ActionTypes.getPatients]({ commit }: SetPatientsCommitActionContext, searchParams: SearchParams): Promise<void>
}
