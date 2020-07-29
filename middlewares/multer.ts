import Error from "../exceptions/app";

import * as multer from "multer";
import * as path from "path";

class Multer {
  private fileFilter = (req: any, file: any, cb: any) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(200, "Image uploaded is not of type jpg, jpeg or png"),
        false
      );
    }
  };

  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../public/img/avatar");
    },
    filename: (req: any, file: any, cb: any) => {
      const basename: string = path.basename(
        file.originalname.split(" ").join("_"),
        path.extname(file.originalname)
      );
      const extension: string = path.extname(file.originalname);
      cb(null, basename + "_" + Date.now() + extension);
    },
  });

  public init = multer({
    storage: this.storage,
    fileFilter: this.fileFilter,
  });
}

export default new Multer().init.single("img");
