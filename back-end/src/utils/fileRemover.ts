import fs from "fs";
import path from "path";

const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      console.log(`File ${filename} doesn't exist`);
    } else if (err) {
      console.log(`Error occured while trying to remove file ${filename}`);
    } else {
      console.log(`Removed ${filename}`);
    }
  });
};

export { fileRemover };
