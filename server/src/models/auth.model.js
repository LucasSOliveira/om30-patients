import fs from "fs";
import { filePath } from "../../utils.js"

const usersdb = JSON.parse(fs.readFileSync(filePath("./src/database/users.json"), "UTF-8"));
const rolesdb = JSON.parse(fs.readFileSync(filePath("./src/database/roles.json"), "UTF-8"));

export const checkCredentials = ({ email, password }) =>
    usersdb.users.some((user) => user.email === email && user.password === password);
export const checkHasRegistration = (email) => 
    usersdb.users.some((user) => user.email === email);
export function getUserLoggedData (email) {
    const user = usersdb.users.find((user) => user.email == email);
    const role = rolesdb.roles.find(({ id }) => user.roleId === id)
    user.role = role

    return user
}
export default {
  checkCredentials,
  checkHasRegistration,
  getUserLoggedData,
};
