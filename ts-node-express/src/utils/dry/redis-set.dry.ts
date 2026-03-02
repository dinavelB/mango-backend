import { redis } from "../../config/redis.config.js";
import { RedisTokenType } from "../../common/types/token-redis.types.js";

// set the type to inherit the RedisJSON type
export async function RedisSetHandler(user: RedisTokenType) {
  const client = redis.client;

  //   key set to email
  await client.json.set(`user:${user.email}`, "$", user);

  return {
    token: user.verificationToken,
  };
}
