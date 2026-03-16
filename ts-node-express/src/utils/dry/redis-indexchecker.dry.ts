import { redis } from "../../config/redis.config.js";
import { RedisSchema } from "../../redis-schema/user.redis-schema.js";
export async function IndexCheckerHandler() {
  const list = (await redis.client.ft._list()) as any;

  let schemas: string[] = ["idx:users"];

  for (let indexName of schemas) {
    if (list.includes(indexName)) {
      console.log("index already exists");
      return;
    }
  }

  await RedisSchema();
}
