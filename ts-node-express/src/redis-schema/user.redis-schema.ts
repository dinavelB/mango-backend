import {
  createClient,
  SCHEMA_FIELD_TYPE,
  FT_AGGREGATE_GROUP_BY_REDUCERS,
  FT_AGGREGATE_STEPS,
} from "redis";
import { redis } from "../config/redis.config.js";

const client = redis.client;
// json schema must match to the receiving json
export async function RedisSchema() {
  const schema = await client.ft.create(
    "idx:users",
    {
      "$.email": {
        type: SCHEMA_FIELD_TYPE.TEXT,
        AS: "email",
      },
      "$.authorizationToken": {
        type: SCHEMA_FIELD_TYPE.TEXT,
        AS: "authorizationToken",
      },
    },
    {
      ON: "JSON",
      PREFIX: "user:",
    },
  );

  return schema;
}
