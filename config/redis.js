const redis = require("redis");

// Use environment variables for Redis connection
const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
});

module.exports={redisClient}