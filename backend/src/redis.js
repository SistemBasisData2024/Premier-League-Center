const Redis = require("ioredis");
require("dotenv").config();

let { REDIS_URL } = process.env;

const redis = new Redis(REDIS_URL);

const redisSub = new Redis(REDIS_URL);

module.exports = { redis, redisSub };
