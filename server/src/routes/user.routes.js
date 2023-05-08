import jsonServer from 'json-server'
import userJson from '../database/users.json' assert { type: "json" };

const usersRoutes = jsonServer.router(userJson);

export default usersRoutes