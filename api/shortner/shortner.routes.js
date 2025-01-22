const router = require("express").Router();
const { createShortner, fetchShortner } = require("./shortner.controller");

router.post("/create", createShortner);
router.get("/:shortId", fetchShortner);

module.exports = {
  shortnerRouter: router,
};
