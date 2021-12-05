// internal dependencies
const cloudinary = require("cloudinary");
const sharp = require("sharp");
const fileUpload = require("express-fileupload");
cloudinary.config({
  cloud_name: "dvejxausc",
  api_key: 242324111385752,
  api_secret: "2fSYEf0xsUYBrS4w2LsDbvqnynk",
});



// To upload the file
exports.uploadFile = async (req, res, next) => {
  console.log("in upload file");
  // console.log(req.files);
  // console.log(res.app.locals.user);
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("no file is uploaded");
    next();
  } else {
    let sampleFile = req.files.sampleFile;
    if (sampleFile.truncated) {
      return res
        .status(400)
        .json({ message: "file is too large , cannot be larger then 5MB" });
    }
    if (
      sampleFile.mimetype == "image/jpeg" ||
      sampleFile.mimetype == "image/png"
    ) {
      let fileExtension = "";
      if (sampleFile.mimetype == "image/jpeg") {
        fileExtension = "jpeg";
      } else fileExtension = "png";

      var sharpFileName = `${
        res.locals.user.name
      }-${Date.now()}.${fileExtension}`;
      console.log(sharpFileName);
      req.fileName = sharpFileName;

      // var filePath = __dirname + '/public/images/' + sharpFileName;
      var filePath = __dirname + "/../public/images/" + sharpFileName;

      //C:/inetpub/wwwroot/hackathon/hustlers/public
      try {
        await sharp(sampleFile.data)
          .resize(600, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(filePath);
        next();
      } catch (err) {
        console.log("express fileupload error");
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", Error: err });
      }
    } else if (sampleFile.mimetype == "application/pdf") {
      let filename = `shiva-${Date.now()}.pdf`;
      req.app.locals.fileName = filename;
      uploadPath = __dirname + "/../public/files/" + filename;
      console.log(uploadPath);
      try {
        await sampleFile.mv(uploadPath);
        if (req.originalUrl == "/upload") {
          return res.status(200).json({ message: "Succesfully updated" });
        }
        next();
      } catch (err) {
        console.log("error: " + err);
        return res.status(500).json({ message: "internal server error" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "You can only upload an image of pdf" });
    }
  }
};
