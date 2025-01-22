const { fileUpload } = require("../../utils/fileUpload");
const { uploadFile, downloadFile } = require("./fileUpload.controller");
const router = require("express").Router();

router.post("/upload", fileUpload, uploadFile);
router.get("/download/:filename", downloadFile);

module.exports = {
  fileUploadRouter: router,
};
