import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/config.js";
import dotenv from "dotenv";
import userroute from "./user/routes/userroute.js";
import { corsConf } from "./utils/middleware/cors-middleware.js";

dotenv.config();

const port = process.env.PORT || 4001;

const app = express();

app.use(corsConf);
app.use(express.json());

app.use("/api/users", userroute);

AppDataSource.initialize()
  .then(() => {
    console.log("Data source has been initialized");

    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.error("Data source failed to initialize:", err);
  });
