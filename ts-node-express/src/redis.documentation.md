### Configuration

1. Create a config custom class for redis with connection

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

2. export the config as the instantiated one.
3. use the exported instance of redis custom class to app.ts or main of the project to make it singleton. Now the redis starts every time the server starts.
4. create a redis schema and export it
5. call the exported schema on the app.ts where the redis is done initialized
6. go to redis cli and check if the index is created.

## redis cli

docker exec -it mangoredis redis-cli

## redis index

FT.\_LIST
