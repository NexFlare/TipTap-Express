import * as redis from "redis";

let redisClient = redis.createClient();
export const createRedisClient = async () => {
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
};

export const disconnectRedisClient = async () => {
  await redisClient.disconnect();
};

export default redisClient;
