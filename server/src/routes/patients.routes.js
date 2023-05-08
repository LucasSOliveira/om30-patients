import jsonServer from 'json-server'
import patientsJson from '../database/patients.json' assert { type: "json" };

const patientsRoutes = jsonServer.router(patientsJson);

export default patientsRoutes