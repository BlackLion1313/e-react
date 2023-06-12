import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  console.log('req', req)
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:

  //find out the file extension
  const extension = path.extname(file.originalname);

  if (extension !== ".jpg" && extension !== ".png" && extension !== ".jpeg") {
    //if it is not any of the extensions allowed, we don't allow the upload
    cb(null, false);
  } else {
    // To accept the file pass `true`, like so:
    cb(null, true);
  }
}

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;