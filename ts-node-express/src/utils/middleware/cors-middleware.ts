import cors from "cors"; //import cors libray when configuring cors

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

export const corsConf = cors(corsConfig);
