import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(path.dirname(new URL(import.meta.url).pathname), "../public/poster");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const randomString = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(file.originalname);
    const poster = "poster-" + randomString + extension;
    cb(null, poster);
  },
});

const fileUpload = multer({ storage });

export default fileUpload; // Exportación por defecto
