const fs = require("fs");
const path = require("path");

function readFiles(dir, callback) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filepath = path.join(dir, file);

    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      readFiles(filepath, callback);
    } else {
      callback(filepath);
    }
  }
}

readFiles(process.cwd(), (filepath) => {
  console.log(filepath);
});
