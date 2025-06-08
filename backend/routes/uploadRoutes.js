const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    //function to upload stream upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        //use streamifier to convert buffer to stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    //call the stream upload function
    const result = await streamUpload(req.file.buffer);
    //responed with uploaded image URL
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = uploadRouter;
