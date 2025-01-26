const express = require("express");
const { router } = require("./routes");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;
const { redisClient } = require("./config/redis");
require("dotenv").config()


redisClient.connect();
redisClient.on('error', (err) => console.error('Redis error:', err));

app.use(express.json());
app.use(morgan("dev"));

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening at Port`, PORT);
});
