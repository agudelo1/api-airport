import express from "express";
import { AppError } from "./errors/appError.js";
import { router } from "./routes/routes.js";
import { envs } from "./config/env/env.js";
import { enableCors } from "./config/plugins/cors.plugin.js";
import { enableMorgan } from "./config/plugins/morgan.plugin.js";
import { globalErrorHandler } from "./errors/error.controller.js";

const app = express();

const ACCEPTED_ORIGINS = ["http://localhost:4000"];

app.use(express.json());

if (envs.NODE_ENV === "development") {
  enableMorgan(app);
}

enableCors(app, ACCEPTED_ORIGINS);

//app.use("/api/v1", passengerRouter);
app.use("/api/v1", router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
