import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const planeSchema = z.object({
  planeNumber: z.number(),
  model: z
    .string(20)
    .min(3, { message: "Model is too shor, minimum 3 characters" })
    .max(20, { message: "Model is too long, mmaximum 20 characters" }),
  maxCapacity: z.number(),
  airline: z.enum([
    "AeroGlobe",
    "AeroTronix",
    "VelocityAir",
    "AirQuest",
    "StartLink",
  ]),
});

export const validatePlane = (data) => {
  const result = planeSchema.safeParse(data);

  const {
    data: planeData,
    errorMessages,
    hasError,
  } = extractValidationData(result);

  return {
    planeData,
    errorMessages,
    hasError,
  };
};

export const validatePartialPlane = (data) => {
  const result = planeSchema.partial().safeParse(data);

  const {
    data: planeData,
    errorMessages,
    hasError,
  } = extractValidationData(result);
  return {
    hasError,
    planeData,
    errorMessages,
  };
};
