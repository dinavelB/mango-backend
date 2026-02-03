import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./config/config.js";
import dotenv from "dotenv";
import userroute from "./routes/userroute.js";
dotenv.config(); //load all env variables

const app = express();

app.use(express.json());

//apis
app.use("/api/users", userroute);

AppDataSource.initialize().then(async () => {
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
  });
  console.log("Data Source has been initialized!");
});
