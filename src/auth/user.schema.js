import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const registerUserSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(199, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(4, { message: "Password is too short, minimum 4 characters" })
    .max(8, { message: "Password is too long, maximum 8 characters" }),
  gender: z.enum(["male", "female", "prefer not to say"]),
  role: z.enum(["receptionist", "admin", "developer", "manager", "user"]),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(4, { message: "Password is too short, minimum 4 characters" })
    .max(8, { message: "Password is too long, maximum 8 characters" }),
});

export const validateRegister = (data) => {
  const result = registerUserSchema.safeParse(data);

  const {
    data: UserData,
    errorMessages,
    hasError,
  } = extractValidationData(result);

  return { UserData, errorMessages, hasError };
};

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data);
  const {
    data: UserData,
    errorMessages,
    hasError,
  } = extractValidationData(result);

  return { UserData, errorMessages, hasError };
};
