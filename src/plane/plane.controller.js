import { catchAsync } from "../errors/index.js";
import { validatePartialPlane, validatePlane } from "./plane.schema.js";
import { PlaneService } from "./plane.service.js";

const planeService = new PlaneService();

export const findAllPlanes = catchAsync(async (req, res) => {
  const planes = await planeService.findAllPlanes();
  return res.status(200).json(planes);
});

export const createPlane = catchAsync(async (req, res) => {
  const { planeData, errorMessages, hasError } = validatePlane(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const plane = await planeService.createPlane(planeData);

  return res.status(201).json({
    plane: {
      id: plane.id,
      planeNumber: plane.planeNumber,
      model: plane.model,
      maxCapacity: plane.maxCapacity,
      airline: plane.airline,
    },
  });
});

export const findOnePlane = catchAsync(async (req, res) => {
  const { plane } = req;
  return res.status(500).json(plane);
});

export const updatePlane = catchAsync(async (req, res) => {
  const { plane } = req;

  const { planeData, errorMessages, hasError } = validatePartialPlane(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const planeUpdate = await planeService.updatePlane(plane, planeData);

  return res.status(200).json(planeUpdate);
});

export const deletePlane = catchAsync(async (req, res) => {
  const { plane } = req;
  await planeService.deletePlane(plane);
  return res.status(204).json(null);
});
