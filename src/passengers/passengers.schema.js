import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

export const passengerSchema = z.object({
  nroPassport: z.string().min(8).max(20),
  name: z.string().min(2).max(99),
  surname: z.string().min(2).max(99),
  birthdate: z.string({
    invalid_type_error: "Birthdate must be a correct format",
    required_error: "Birthdate is required",
  }),
  gender: z.enum(["male", "female", "prefer not to say"]),
  email: z.string().email(),
  celphone: z.string().min(5).max(20),
  createdBy: z.number(),
});

export function validatePassenger(data) {
  const result = passengerSchema.safeParse(data);

  const {
    data: passengerData,
    errorMessages,
    hasError,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    passengerData,
  };
}

export function validatePartialPassenger(data) {
  const result = passengerSchema.partial().safeParse(data);

  const {
    data: passengerData,
    errorMessages,
    hasError,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    passengerData,
  };
}
