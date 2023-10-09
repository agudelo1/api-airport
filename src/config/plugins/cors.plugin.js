import cors from "cors";

export const enableCors = (app, acceptedOrigins) => {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
          return callback(null, true);
        }

        if (!origin) {
          return callback(null, true);
        }
      },
    })
  );
};
