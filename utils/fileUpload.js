const { path } = require("path");
const multer = require("multer");
const fs = require("fs");

// Middleware to ensure the 'uploads' directory exists
fs.existsSync("uploads") || fs.mkdirSync("uploads");

// Set up multer storage (you can customize it further)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replaceAll(" ","_")); // Append a timestamp to the file name
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit to 1 MB
});

// Middleware function to handle file uploads
const fileUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).send({ error: "File upload failed", message: err.message });
    }
    next();
  });
};

module.exports = { fileUpload };
