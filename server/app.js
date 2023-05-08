import jsonServer from 'json-server'
import bodyParser from 'body-parser'
import {
  authRoutesMiddleware,
  loginMiddleware,
  meMiddleware
} from './src/controller/auth.controller.js'
import { usersMiddleware } from './src/controller/users.controller.js'
import { patientsMiddleware } from './src/controller/patients.controller.js'
import userRoutes from './src/routes/user.routes.js'
import patientsRoutes from './src/routes/patients.routes.js'

const server = jsonServer.create()
const port = 8000
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults())
server.use(/^(?!\/login).*$/, authRoutesMiddleware)
server.use('/login', loginMiddleware)
server.use('/users', usersMiddleware)
server.use('/patients', patientsMiddleware)
server.use('/me', meMiddleware)

server.use(patientsRoutes)
server.use(userRoutes)
server.listen(port, () => {
  console.log(`Server on http://localhost:${port}/`)
})
