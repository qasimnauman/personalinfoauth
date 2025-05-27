import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes Imports
import authRouter from "./routes/auth.route.js"
import personalInfoRouter from "./routes/personalinfo.route.js";

const app = express();

app.use(
    cors({
        origin: "*",
        // origin: process.env.CORS_ORIGIN,
        // credentials: true,
    })
);

app.use(
    express.json({
        limit: "16kb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

// Swagger Docs MiddleWare
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static("public"));
app.use(cookieParser());

// Swagger documentation route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Add this line

// Routes Declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/personalinfo", personalInfoRouter);
// app.use("/api/v1/subscriptions", subscriptionRouter);
// app.use("/api/v1/videos", videoRouter);

export { app };
