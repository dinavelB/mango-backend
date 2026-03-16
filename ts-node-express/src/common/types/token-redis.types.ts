import type { RedisJSON } from "redis";

// types must  be match to redis json schema
export type RedisTokenType = RedisJSON & {
  email: string;
  verificationToken: string;
};

export type DelKey = RedisJSON & {
  email: string;
};
