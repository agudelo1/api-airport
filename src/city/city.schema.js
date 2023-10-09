import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const citySchema = z.object({
  name: z.string().min(3).max(99),
  country: z.string().min(3).max(100),
  lat: z.number(),
  long: z.number(),
});

export const validateCity = (data) => {
  const result = citySchema.safeParse(data);

  const {
    data: CityData,
    errorMessages,
    hasError,
  } = extractValidationData(result);

  return {
    CityData,
    errorMessages,
    hasError,
  };
};

export const validatePartialCity = (data) => {
  const result = citySchema.partial().safeParse(data);

  const {
    data: dataCity,
    errorMessages,
    hasError,
  } = extractValidationData(result);
  return {
    hasError,
    dataCity,
    errorMessages,
  };
};
