import fs from 'fs'
import { filePath } from '../../utils.js'

export const patientsdb = JSON.parse(
  fs.readFileSync(filePath('./src/database/patients.json'), 'UTF-8')
)

export const checkHasPatientById = (id) =>
  patientsdb.patients.some((patient) => patient.id === id)
export const checkHasPatientByCpf = (cpf) =>
  patientsdb.patients.some((patient) => patient.cpf === cpf)
export const getPatientByid = (id) =>
  patientsdb.patients.find((patient) => patient.id === id)
export const getPatientByCpf = (cpf) =>
  patientsdb.patients.find((patient) => patient.cpf === cpf)

export function registerPatient(patient) {
  const id = patientsdb.patients.length === 0 ? 1 : patientsdb.patients[patientsdb.patients.length - 1].id + 1
  const patients = patientsdb.patients

  patients.push({ ...patient, id })
  fs.writeFileSync(
    filePath('./src/database/patients.json'),
    JSON.stringify({ patients }),
    'utf-8'
  )
}
export function deletePatient(patient) {
  const { id } = patient
  const patients = patientsdb.patients
  const getPatientsIndex = patients.findIndex((item) => id === item.id)

  patients.splice(getPatientsIndex, 1)
  fs.writeFileSync(
    filePath('./src/database/patients.json'),
    JSON.stringify({ patients }),
    'utf-8'
  )
}
export function updatePatient(patient) {
  const { id } = patient
  const patients = patientsdb.patients
  const getPatientsIndex = patients.findIndex((item) => id === item.id)

  patients[getPatientsIndex] = patient
  fs.writeFileSync(filePath('./src/database/patients.json'), JSON.stringify({ patients }), 'utf-8')
}

export default {
  checkHasPatientById,
  checkHasPatientByCpf,
  registerPatient,
  getPatientByid,
  getPatientByCpf,
  deletePatient,
  patientsdb
}
