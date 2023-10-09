import {
  encriptedPassword,
  verifyPassword,
} from "../config/plugins/encripted-password.plugin.js";
import generateJWT from "../config/plugins/generate-jwt.plugin.js";
import { AppError, catchAsync } from "../errors/index.js";
import { AuthService } from "./auth.service.js";
import { validateLogin, validateRegister } from "./user.schema.js";

const authService = new AuthService();

export const login = catchAsync(async (req, res, next) => {
  const { UserData, errorMessages, hasError } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  //Validar que el usuario exista en base de datos

  const user = await authService.finOneUserByEmail(UserData.email);

  if (!user) {
    return next(new AppError("This account does not exist", 404));
  }

  const isCorrectPassword = await verifyPassword(
    UserData.password,
    user.password
  );

  // Validar si la contraseña es correcta

  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // generar el token
  const token = await generateJWT(user.id);

  // Enviar la respuesta al cliente

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      gender: user.gender,
      role: user.role,
    },
  });
});
export const register = catchAsync(async (req, res, next) => {
  const { UserData, errorMessages, hasError } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const user = await authService.createUSer(UserData);

  const token = await generateJWT(user.id);
  return res.status(201).json({
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      gender: user.gender,
      role: user.role,
    },
  });
});

export const changePassword = catchAsync(async (req, res, next) => {
  //1. traerme el usuario

  const { sessionUser } = req;

  //2. traerme los datos de la req.body
  const { currentPassword, newPassword } = req.body;

  //3. validar si la contraseña actual y la nueva son iguales

  if (currentPassword === newPassword) {
    return next(new AppError("The password cannot de equals", 400));
  }

  //4. Validar si la contraseña actual es igual a la base de datos.

  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  );

  // Validar si la contraseña es correcta

  if (!isCorrectPassword) {
    return next(new AppError("Incorrect password", 401));
  }

  //5. encriptar la nueva contraseña

  const hashedNewPassword = await encriptedPassword(newPassword);

  await authService.updateUser(sessionUser, {
    password: hashedNewPassword,
    chagedPasswordAt: new Date(),
  });

  return res.status(200).json({
    message: "The user password was updated successfully",
  });
});
