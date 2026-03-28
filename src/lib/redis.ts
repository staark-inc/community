/*import IORedis from "ioredis";

export const redis = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});*/

import IORedis from "ioredis";

let _redis: IORedis | null = null;

export const redis = new Proxy({} as IORedis, {
  get(_, prop) {
    if (!_redis) {
      _redis = new IORedis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT || 6379),
        password: process.env.REDIS_PASSWORD,
        maxRetriesPerRequest: null,
      });
    }
    return (_redis as any)[prop];
  },
});