import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const flightSchema = z.object({
  originId: z.number(),
  destinationId: z.number(),
  planeId: z.number(),
  departureTime: z.string({
    invalid_type_error: "Departure time must be a correct format",
    required_error: "Departure time is required",
  }),
  checkIn: z
    .string({
      invalid_type_error: "Check in time must be a correct format",
    })
    .optional(),
  status: z
    .enum(["pending", "inProgress", "done", "cancelled", "delayed"])
    .default("pending"),
});

export const validateFlight = (data) => {
  const result = flightSchema.safeParse(data);

  const {
    data: flightData,
    errorMessages,
    hasError,
  } = extractValidationData(result);

  return {
    flightData,
    errorMessages,
    hasError,
  };
};

export const validatePartialFlight = (data) => {
  const result = flightSchema.partial().safeParse(data);

  const {
    data: flightData,
    errorMessages,
    hasError,
  } = extractValidationData(result);
  return {
    hasError,
    flightData,
    errorMessages,
  };
};
