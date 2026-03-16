import { redis } from "../../config/redis.config.js";
import { DelKey } from "../../common/types/token-redis.types.js";

// set the type to inherit the RedisJSON type
export async function DelRedisKey(user: DelKey) {
  const client = redis.client;

  //   key set to email
  const redisUser = await client.json.del(`user:${user.email}`);

  if (!redisUser) {
    throw new Error("key not found");
  }
  
  return "key deleted";
}
