import * as Yup from 'yup'

export const cpfValidator = (value: any) => {
  const cpf = value.replace(/[^\d]+/g, '')
  let sum = 0
  let remainder
  if (
    cpf === '00000000000'
    || cpf === '11111111111'
    || cpf === '22222222222'
    || cpf === '33333333333'
    || cpf === '44444444444'
    || cpf === '55555555555'
    || cpf === '66666666666'
    || cpf === '77777777777'
    || cpf === '88888888888'
    || cpf === '99999999999'
  ) {
    return false
  }
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
    return false
  }
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cpf.substring(10, 11), 10)) {
    return false
  }
  return true
}

export const birthDateValidator = (value: any) => {
  const parts = value.split('/')
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)

  const data = new Date(year, month, day)
  const current = new Date()
  return data < current
}

const cnsValidatorFristRoutine = (cns: any) => {
  if (cns.trim().length !== 15) {
    return false
  }

  const pis = cns.substring(0, 11)

  let soma = 0
  for (let i = 0; i < pis.length; i++) {
    soma += parseInt(pis[i], 10) * (15 - i)
  }

  let resto = soma % 11
  let dv = 11 - resto

  if (dv === 11) {
    dv = 0
  }

  if (dv === 10) {
    soma = 0
    for (let i = 0; i < pis.length; i++) {
      soma += parseInt(pis[i], 10) * (15 - i + 2)
    }
    resto = soma % 11
    dv = 11 - resto
  }

  const resultado = `${pis}000${dv}`

  return cns === resultado
}

const cnsValidatorSecondRoutine = (cns: any) => {
  if (cns.trim().length !== 15) {
    return false
  }

  const soma = parseInt(cns.substring(0, 1), 10) * 15
    + parseInt(cns.substring(1, 2), 10) * 14
    + parseInt(cns.substring(2, 3), 10) * 13
    + parseInt(cns.substring(3, 4), 10) * 12
    + parseInt(cns.substring(4, 5), 10) * 11
    + parseInt(cns.substring(5, 6), 10) * 10
    + parseInt(cns.substring(6, 7), 10) * 9
    + parseInt(cns.substring(7, 8), 10) * 8
    + parseInt(cns.substring(8, 9), 10) * 7
    + parseInt(cns.substring(9, 10), 10) * 6
    + parseInt(cns.substring(10, 11), 10) * 5
    + parseInt(cns.substring(11, 12), 10) * 4
    + parseInt(cns.substring(12, 13), 10) * 3
    + parseInt(cns.substring(13, 14), 10) * 2
    + parseInt(cns.substring(14, 15), 10) * 1

  const resto = soma % 11

  if (resto !== 0) {
    return false
  }
  return true
}

export const cnsValidator = (value: any) => {
  const valueTrim = value.replace(/\s+/g, '')

  return cnsValidatorFristRoutine(valueTrim) || cnsValidatorSecondRoutine(valueTrim)
}

export const zipCodeValidator = (value: any) => {
  const cep = value.replace(/\D/g, '')

  if (cep && cep.length !== 8) {
    return false
  }

  if (
    cep === '11111111'
    || cep === '22222222'
    || cep === '33333333'
    || cep === '44444444'
    || cep === '55555555'
    || cep === '66666666'
    || cep === '77777777'
    || cep === '88888888'
    || cep === '99999999'
    || cep === '00000000'
  ) {
    return false
  }

  return true
}

export const patientSchema = Yup.object().shape({
  name: Yup.string().required('Esse campo é obrigatório'),
  lastName: Yup.string().required('Esse campo é obrigatório'),
  motherName: Yup.string().required('Esse campo é obrigatório'),
  cpf: Yup.string()
    .test('cpf', 'CPF inválido', cpfValidator),
  birthDate: Yup.string().required('Data de nascimento inválida')
    .test('birthDate', 'Data de nascimento deve ser anterior à data atual', birthDateValidator),
  cns: Yup.string().required('Esse campo é obrigatório').test('cns', 'CNS inválido', cnsValidator),
  zipCode: Yup.string().required('Esse campo é obrigatório').test('zipCode', 'CEP inválido', zipCodeValidator),
  streetAdress: Yup.string().required('Esse campo é obrigatório'),
  number: Yup.string().required('Esse campo é obrigatório'),
  neighborhood: Yup.string().required('Esse campo é obrigatório'),
  city: Yup.string().required('Esse campo é obrigatório'),
  state: Yup.string().required('Esse campo é obrigatório')
})

export const cpfSchema = Yup.object().shape({
  cpf: Yup.string()
    .test('cpf', 'CPF inválido', cpfValidator)
})
