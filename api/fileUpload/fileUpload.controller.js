const fs = require("fs");
const path = require("path");

const uploadFile = (req, res) => {
  console.log("check", req.file);

  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  res.status(200).send({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
};

const downloadFile =  (req, res) => {
  const filePath = path.join(__dirname, "../../uploads", req.params.filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send("File not found");
      }

      // Create a readable stream for the file
      const readStream = fs.createReadStream(filePath);

      // Pipe the stream to the response
      readStream.pipe(res).on("data",()=>console.log("."));
    });
};

module.exports = {
  uploadFile,
  downloadFile,
};
