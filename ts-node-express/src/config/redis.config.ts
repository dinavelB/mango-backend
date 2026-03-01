import { createClient } from "redis";
import { RedisClientType } from "redis";
// redis local connect

class RedisClientCnfig {
  public client: RedisClientType;

  constructor() {
    this.client = createClient({
      username: "default",
      password: "secret",
      socket: {
        host: "localhost",
        port: 6379,
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
