import express from "express";
import router from "./router";
import { createRedisClient } from "./redisClient";
import cors from "cors";

const app = express();

app.use(express.json());
//middlewear to encode URL
app.use(express.urlencoded());
//middleware for cross origin resource sharing
app.use(cors());
createRedisClient();
router(app);

export default app;
