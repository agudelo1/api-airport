import generateJWT from "../config/plugins/generate-jwt.plugin.js";
import { catchAsync } from "../errors/index.js";
import { AuthService } from "./auth.service.js";
import { validateRegister } from "./user.schema.js";

const authService = new AuthService();

export const login = catchAsync(async (req, res, next) => {});
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
