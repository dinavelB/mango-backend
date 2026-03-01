import {
  createClient,
  SCHEMA_FIELD_TYPE,
  FT_AGGREGATE_GROUP_BY_REDUCERS,
  FT_AGGREGATE_STEPS,
} from "redis";
import { redis } from "../config/redis.config.js";

const client = redis.client;

export async function RedisSchema() {
  const schema = await client.ft.create(
    "idx:users",
    {
      "$.name": {
        type: SCHEMA_FIELD_TYPE.TEXT,
        AS: "name",
      },
      "$.city": {
        type: SCHEMA_FIELD_TYPE.TEXT,
        AS: "city",
      },
      "$.age": {
        type: SCHEMA_FIELD_TYPE.NUMERIC,
        AS: "age",
      },
    },
    {
      ON: "JSON",
      PREFIX: "user:",
    },
  );

  return schema;
}
