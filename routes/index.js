const { fileUploadRouter } = require("../api/fileUpload/fileUpload.routes");
const { shortnerRouter } = require("../api/shortner/shortner.routes");

const router = require("express").Router();

router.use("/shortner", shortnerRouter);
router.use("/file", fileUploadRouter);

module.exports = {
  router,
};
