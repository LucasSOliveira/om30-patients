import { authorization } from './auth.controller.js'
import {
  checkHasPatientByCpf, registerPatient, updatePatient, deletePatient, patientsdb
} from '../models/patients.model.js'

// eslint-disable-next-line consistent-return
export function patientsGetMiddleware(req, res, next) {
  const status = 406
  const message = 'Ops.. Nem um paciente cadastrado!'

  if (!patientsdb && !patientsdb.length) {
    return res.status(status).json({ status, message })
  }
  next()
}

export function patientsRegisterMiddleware(req, res) {
  let status = 401
  let message = 'Você não tem permissão para cadastrar um paciente!'
  const userLogged = authorization(req.headers.authorization)
  const hasPermission = userLogged.role.routesPermission && userLogged.role.routesPermission.some((permission) => permission === 'PATIENTS')
  const hasAction = userLogged.role.actions && userLogged.role.actions.some((action) => action === 'USER_CREATE')
  const { patient } = req.body

  console.log(patient)
  if (!hasAction && !hasPermission) {
    return res.status(status).json({ status, message })
  }
  if (checkHasPatientByCpf(patient.cpf)) {
    message = 'Existe um paciente com esse CPF cadastrado!'

    return res.status(status).json({ status, message })
  }
  try {
    registerPatient(patient)
    status = 200
    message = `Paciente ${patient.name || ''} cadastrado com sucesso!`
    return res.status(status).json({ status, message })
  } catch (error) {
    status = 406
    message = `Erro ao cadastrar paciente ${patient.name || ''}!`
    return res.status(status).json({ status, message, error })
  }
}
export function patientsUpdateMiddleware(req, res) {
  let status = 401
  let message = 'Você não tem permissão para editar pacientes!'
  const userLogged = authorization(req.headers.authorization)
  const hasPermission = userLogged.role.routesPermission && userLogged.role.routesPermission.some((permission) => permission === 'PATIENTS')
  const hasAction = userLogged.role.actions && userLogged.role.actions.some((action) => action === 'USER_EDIT')
  const { patient } = req.body

  if (!hasAction && !hasPermission) {
    return res.status(status).json({ status, message })
  }
  if (!checkHasPatientByCpf(patient.cpf)) {
    message = 'O paciente que esta tentando editar não foi encontrado!'
    status = 406
    return res.status(status).json({ status, message })
  }
  try {
    updatePatient(patient)
    status = 200
    message = `Paciente ${patient.name} editado com sucesso!`
    return res.status(status).json({
      status,
      message
    })
  } catch (error) {
    status = 406
    message = 'Erro ao editar paciente!'
    return res.status(status).json({ status, message, error })
  }
}
export function patientesDeleteMiddleware(req, res) {
  console.log(req)
  const userLogged = authorization(req.headers.authorization)
  const hasPermission = userLogged.role.routesPermission && userLogged.role.routesPermission.some((permission) => permission === 'PATIENTS')
  const hasAction = userLogged.role.actions && userLogged.role.actions.some((action) => action === 'PATIENT_DELETE')
  const { patient } = req.body
  let status = 401
  let message = 'Você não tem permissão para excluir pacientes!'

  if (!hasAction && !hasPermission) {
    return res.status(status).json({
      status,
      message
    })
  }
  if (!checkHasPatientByCpf(patient.cpf)) {
    message = 'O usuário que esta tentando excluir não foi encontrado!'
    status = 406
    return res.status(status).json({
      status,
      message
    })
  }
  try {
    deletePatient(patient)
    status = 200
    message = `Paciente ${patient.name || ''} excluido com sucesso!`
    return res.status(status).json({
      status,
      message
    })
  } catch (error) {
    status = 406
    message = `Não foi possível excluir o usuário ${patient.name || ''}!`
    return res.status(status).json({
      status,
      message,
      error
    })
  }
}
// eslint-disable-next-line consistent-return
export function patientsMiddleware(req, res, next) {
  if (req.method === 'GET') {
    return patientsGetMiddleware(req, res, next)
  }
  if (req.method === 'POST') {
    return patientsRegisterMiddleware(req, res, next)
  }
  if (req.method === 'PUT') {
    return patientsUpdateMiddleware(req, res, next)
  }
  if (req.method === 'DELETE') {
    return patientesDeleteMiddleware(req, res, next)
  }
  next()
}
export default {
  patientsMiddleware,
  patientsGetMiddleware,
  patientsRegisterMiddleware,
  patientsUpdateMiddleware,
  patientesDeleteMiddleware
}
