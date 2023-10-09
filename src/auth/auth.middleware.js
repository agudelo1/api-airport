import jwt from "jsonwebtoken";
import { AppError, catchAsync } from "../errors/index.js";
import { envs } from "../config/env/env.js";
import { promisify } from "util";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export const protect = catchAsync(async (req, res, next) => {
  //1. obtener el token

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //2. Validar si el token existe

  if (!token) {
    return next(
      new AppError("You are not logged in!, Please log in to get access", 401)
    );
  }

  //3. decodificar el token

  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  //4. buscar el usuario dueño del token, y validar si existe.

  const user = await authService.findOneUserById(decoded.id);

  if (!user) {
    return next(
      new AppError("The owner of this token is not longer available", 401)
    );
  }

  //5. Validacion del cambio de contraseña

  if (user.chagedPasswordAt) {
    const changerTimeStamp = parseInt(
      user.chagedPasswordAt.getTime() / 1000,
      10
    );

    if (decoded.iat < changerTimeStamp) {
      return next(
        new AppError("User recently changed password!, please login again", 401)
      );
    }
  }

  //6.  adjuntar el usuario en sesion , el usuario en sesion es el usuario dueño del token

  req.sessionUser = user;

  next();

  //7 ¿despues que?
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
