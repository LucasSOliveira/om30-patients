import jwt from 'jsonwebtoken'
import {
  checkCredentials,
  checkHasRegistration,
  getUserLoggedData
} from '../models/auth.model.js'

const SECRET_KEY = 'l31l05l1995'
const expiresIn = '1h'
const createToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn })
const verifyTokenDecode = (err, decode) => (decode || err)
const verifyToken = (token) => jwt.verify(token, SECRET_KEY, verifyTokenDecode)

export const authorization = (headerAuthorization) => {
  const withOutToken = !headerAuthorization && headerAuthorization?.split(' ')[0] !== 'Bearer'
  let userLogged = {}

  if (withOutToken) {
    return userLogged
  }

  const token = headerAuthorization.split(' ')[1]
  const verifyTokenResult = verifyToken(token)
  if (verifyTokenResult instanceof Error) {
    return userLogged
  }
  const userData = getUserLoggedData(verifyTokenResult.email)

  if (!userData) {
    return userLogged
  }

  const { id, email, name, role, gender } = userData
  userLogged = ({ id, email, name, role, token, gender })

  return userLogged
}

export function loginMiddleware(req, res) {
  setTimeout(() => {
    const { email, password } = req.body
    let status; let
      message
  
    if (!checkHasRegistration(email)) {
      status = 401
      message = 'E-mail incorreto ou não cadastrado'
      return res.status(status).json({ status, message })
    }
  
    if (!checkCredentials({ email, password })) {
      status = 401
      message = 'E-mail ou senha incorreta'
      return res.status(status).json({ status, message })
    }
    const access_token = createToken({ email, password })
  
    return res.status(200).json({ access_token })
  }, 2000)
}

export function meMiddleware(req, res) {
  if (req.method === 'GET') {
    return setTimeout(() => {
      let status = 401
      let message = 'Login expirado!'
      const userLogged = authorization(req.headers.authorization)
      if (!userLogged.token) {
        return res.status(status).json({
          status,
          message
        })
      }
      status = 200
      message = 'token'
      return res.status(status).json({
        status,
        message,
        userLogged
      })
    },2000)
  }

  return res.status(406).json({
    status: 406,
    message: '406'
  })
}

export function authRoutesMiddleware(req, res, next) {
  setTimeout(() => {
    const { status, message, hasAuthorization } = authorization(
      req.headers.authorization
    )
    if (hasAuthorization) {
      return res.status(status).json({
        status,
        message
      })
    }
    next()
  }, 2500)
}

export default {
  authorization,
  loginMiddleware,
  meMiddleware,
  authRoutesMiddleware
}
