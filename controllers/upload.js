import multer from "multer";
import path from 'path';

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'user-images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
});

function fileFilter(req, file, cb) {
  const allowedExt = [".png", ".jpg", ".jpeg", ".webp"];
  const allowedMime = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext) || !allowedMime.includes(file.mimetype)) {
    return cb(new Error("Only png, jpg, jpeg, and webp files are allowed"));
  }

  cb(null, true);
}

const upload = multer({storage : fileStorageEngine,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024, // 1MB
  }
});

export { upload }