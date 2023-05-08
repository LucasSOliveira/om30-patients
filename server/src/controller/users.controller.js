import { authorization } from "./auth.controller.js";
import {
  users,
  registerUser,
  updateUser,
  checkHasUserById,
} from "../models/user.model.js";
import { checkHasRegistration } from "../models/auth.model.js";

export function usersGetMiddleware(req, res, next) {
  const userLogged = authorization(req.headers.authorization);
  const hasPermission = userLogged.role.routesPermission && userLogged.role.routesPermission.some((permission) => permission === "USERS");
  let status = 401;
  let message = "Você não tem permissão de acesso!";

  if (!hasPermission) {
    return res.status(status).json({
      status,
      message,
    });
  }
  if (!users && !users.length) {
    status = 406;
    message = "Ops.. Nem um usuário cadastrado!";
    return res.status(status).json({
      status,
      message,
    });
  }
  try {
    status = 200;
    message = "Usuários cadastrados";
    return res.status(status).json({
      status,
      message,
      users
    });
  } catch (error) {
    status = 406,
    message = "Erro ao encontrar usuários cadastrados!"
    return res.status(status).json({
      status,
      message,
      error
    });
  }
}
export function userRegisterMiddleware(req, res) {
  const userLogged = authorization(req.headers.authorization);
  const hasPermission = userLogged.role.routesPermission && userLogged.role.routesPermission.some((permission) => permission === "USERS");
  const hasAction = userLogged.role.actions && userLogged.role.actions.some((action) => action === "USER_CREATE");
  const { user } = req.body;
  let status = 401;
  let message = "Você não tem permissão para criar usuários!";

  if (!hasAction && !hasPermission) {
    return res.status(status).json({
      status,
      message,
    });
  }
  if (checkHasRegistration(user.email)) {
    message = "Email já possui cadastro!";

    return res.status(status).json({
      status,
      message,
    });
  }
  if (!user.password || user.password === " " || user.password.length < 3) {
    status = 406;
    message = user.password.length < 3
      ? "A senha deve conter no mínimo 4 digitos"
      : "O cadastro da senha é obrigatório!";
    return res.status(status).json({
      status,
      message,
    });
  }
  if (!user.name || user.name === " ") {
    status = 406;
    message = "O cadastro do nome é obrigatório!";
    return res.status(status).json({
      status,
      message,
    });
  }
  if (!user.roleId) {
    status = 406;
    message = "Você precisa indicar uma função para esse usuário!";
    return res.status(status).json({
      status: status,
      message: message,
    });
  }
  registerUser(user);
  status = 200;
  message = `Usuário ${user.name} cadastrado com sucesso!`;
  return res.status(status).json({
    status: status,
    message: message,
  });
}
export function userUpdateMiddleware(req, res) {
  const userLogged = authorization(req.headers.authorization);
  const hasPermission = userLogged.role.routesPermission && userLogged.role.routesPermission.some((permission) => permission === "USERS");
  const hasAction = userLogged.role.actions && userLogged.role.actions.some((action) => action === "USER_EDIT");
  const { user } = req.body;
  let status = 401;
  let message = "Você não tem permissão para editar usuários!";

  if (!hasAction && !hasPermission) {
    return res.status(status).json({
      status,
      message,
    });
  }
  if (!checkHasUserById(user.id)) {
    message = "O usuário que esta tentando editar não foi encontrado!";
    status = 404;
    return res.status(status).json({
      status,
      message,
    });
  }
  if (!user.password || user.password === " " || user.password.length < 4) {
    status = 406;
    message = user.password.length < 4 && user.password !== ""
        ? "A senha deve conter no mínimo 4 digitos"
        : "O cadastro da senha é obrigatório!";
    return res.status(status).json({
      status: status,
      message: message,
    });
  }
  if (!user.name || user.name === " ") {
    status = 406;
    message = "O cadastro do nome é obrigatório!";
    return res.status(status).json({
      status: status,
      message: message,
    });
  }
  if (!user.roleId) {
    status = 406;
    message = "Você precisa indicar uma função para esse usuário!";
    return res.status(status).json({
      status: status,
      message: message,
    });
  }
  status = 200;
  message = `Usuário ${user.name} editado com sucesso!`;
  updateUser(user);
  return res.status(status).json({
    status: status,
    message: message,
  });
}
export function userDeleteMiddleware(req, res) {
  const userLogged = authorization(req.headers.authorization);
  const hasPermission = userLogged.role.routesPermission && userLogged.role.routesPermission.some((permission) => permission === "USERS");
  const hasAction = userLogged.role.actions && userLogged.role.actions.some((action) => action === "USER_DELETE");
  const { user } = req.body;
  let middlewareStatus = 401;
  let middlewareMessage = "Você não tem permissão para excluir usuários!";

  if (!hasAction && !hasPermission) {
      return res.status(middlewareStatus).json({
          status: middlewareStatus,
          message: middlewareMessage
      });
  }
  if (!checkHasUserById(user.id)) {
    middlewareMessage =
      "O usuário que esta tentando excluir não foi encontrado!";
    middlewareStatus = 404;
    return res.status(middlewareStatus).json({
      status: middlewareStatus,
      message: middlewareMessage,
    });
  }
  try {
    updateUser(user);
    middlewareStatus = 200;
    middlewareMessage = `Usuário ${user.name || ""} excluido com sucesso!`;
    return res.status(middlewareStatus).json({
      status: middlewareStatus,
      message: middlewareMessage,
    });
  } catch (error) {
    middlewareStatus = 406;
    middlewareMessage = `Não foi possível excluir o usuário ${
      user.name || ""
    }!`;
    return res.status(middlewareStatus).json({
      status: middlewareStatus,
      message: middlewareMessage,
      error,
    });
  }
}
export function usersMiddleware(req, res, next) {
  if (req.method === "GET") {
    return usersGetMiddleware(req, res, next);
  }
  if (req.method === "POST") {
    return userRegisterMiddleware(req, res, next);
  }
  if (req.method === "PUT") {
    return userUpdateMiddleware(req, res, next);
  }
  if (req.method === "DELETE") {
    return userDeleteMiddleware(req, res, next);
  }
  next();
}
export default {
  usersMiddleware,
  usersGetMiddleware,
  userRegisterMiddleware,
  userUpdateMiddleware,
  userDeleteMiddleware,
};
