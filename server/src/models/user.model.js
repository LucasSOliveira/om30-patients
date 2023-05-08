import fs from "fs";
import { filePath } from "../../utils.js"

const usersdb = JSON.parse(fs.readFileSync(filePath("./src/database/users.json"), "UTF-8"));
export const users = usersdb.users.map(({ name, email, id }) => ({ id, name, email }));

export const checkHasUserById = (id) =>
    usersdb.users.some((user) => user.id === id);
export function registerUser (user) {
    const id = usersdb.users[usersdb.users.length - 1].id + 1;
    const users = usersdb.users

    users.push({ id, ...user })
    const userDataStrigify = JSON.stringify({ users })
    fs.writeFileSync(filePath("./src/database/users.json"), userDataStrigify, 'utf-8')
}
export function updateUser (user) {
    const { id } = user
    const users = usersdb.users
    const getUserIndex = users.findIndex((item) => id === item.id)
    
    users[getUserIndex] = user
    fs.writeFileSync(filePath("./src/database/users.json"), JSON.stringify({ users }), 'utf-8')
}
export function deleteUser (user) {
    const { id } = user
    const users = usersdb.users
    const getUserIndex = users.findIndex((item) => id === item.id)
    
    users.splice(getUserIndex, 1)
    fs.writeFileSync(filePath("./src/database/users.json"), JSON.stringify({ users }), 'utf-8')
}

export default {
    users,
    registerUser,
    checkHasUserById,
    deleteUser,
    updateUser
}
