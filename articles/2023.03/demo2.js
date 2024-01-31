const fs = require("fs");
const path = require("path");

function* readFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filepath = path.join(dir, file);

    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      for (const next of readFiles(filepath)) {
        yield next;
      }
    } else {
      yield filepath;
    }
  }
}

for (const file of readFiles(process.cwd())) {
  console.log(file);
}
