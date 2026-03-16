import { createClient } from "redis";
import { RedisClientType } from "redis";
// redis local connect

class RedisClientCnfig {
  public client: RedisClientType;

  constructor() {
    this.client = createClient({
      username: "default",
      password: "7J3xrfsFbEUPXDpwtzDme0Jkp49Ac216",
      socket: {
        host: "redis-13702.c258.us-east-1-4.ec2.cloud.redislabs.com.",
        port: 13702,
      },
    });
  }
  async startRedis() {
    try {
      await this.client.connect();
      console.log("redis connected successfully");

      await this.client.set("test", "hello from redis");
      const test = await this.client.get("test");
      console.log("redis received test", test);
    } catch (e) {
      console.log("redis failed to run");
    }
  }
}

// can instatiate then export and used everywhere without instatiating again
export const redis = new RedisClientCnfig();
