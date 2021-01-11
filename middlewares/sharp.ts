import Error from "../exceptions/app";

import * as sharp from "sharp";

sharp(req.file.path)
  .resize(200, 200)
  .toFile(
    "uploads/" + "thumbnails-" + req.file.originalname,
    (err, resizeImage) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resizeImage);
      }
    }
  );
