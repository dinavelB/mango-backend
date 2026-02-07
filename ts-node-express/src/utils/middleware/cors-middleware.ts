import cors from "cors"; //import cors libray when configuring cors

const corsConfig = {
  origin: "http://localhost:5173", //point to port client
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  exposedHeaders: ["set-cookie"],

  optionsSuccessStatus: 200,
};

export const corsConf = cors(corsConfig);
