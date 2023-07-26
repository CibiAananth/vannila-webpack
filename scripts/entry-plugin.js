const fs = require("fs");
const path = require("path");

function generateEntries(folderPath = "../src/pages") {
  const dirAbsolutePath = path.resolve(__dirname, folderPath);
  const items = fs.readdirSync(dirAbsolutePath);

  return items.reduce((entries, item) => {
    const itemPath = path.resolve(dirAbsolutePath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      return { ...entries, ...generateEntries(path.join(folderPath, item)) };
    } else if (path.extname(item) === ".js") {
      const name = path.basename(item, ".js");
      const folderName = path.basename(folderPath);
      entries[path.join(folderName, name)] = itemPath;
    }
    return entries;
  }, {});
}

module.exports = generateEntries();
