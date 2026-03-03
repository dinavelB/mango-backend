import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/config.js";
import dotenv from "dotenv";
import userroute from "./user/routes/userroute.js";
import { corsConf } from "./utils/security/cors-middleware.js";
import { redis } from "./config/redis.config.js";
import { IndexCheckerHandler } from "./utils/dry/redis-indexchecker.dry.js";
dotenv.config();

const port = process.env.PORT || 4001;

const app = express();

app.use(corsConf);
app.use(express.json());

app.use("/api/users", userroute);

// if its promise automatically you dont need awaits
Promise.all([AppDataSource.initialize(), redis.startRedis()])
  .then(async ([dbconn, redisconn]) => {
    console.log("data source has been initialized");
    console.log("redis has been initialized");

    IndexCheckerHandler();
  })
  .catch((e) => {
    console.log("failed to initialize:", e);
    process.exit();
  });
