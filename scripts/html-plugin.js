const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function generateHtmlPlugins(folderPath = "../src/pages") {
  const dirAbsolutePath = path.resolve(__dirname, folderPath);
  const items = fs.readdirSync(dirAbsolutePath);

  return items.flatMap((item) => {
    const itemPath = path.resolve(dirAbsolutePath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      return generateHtmlPlugins(path.join(folderPath, item));
    } else if (path.extname(item) === ".html") {
      const name = path.basename(item, ".html");
      const folderName = path.basename(folderPath);
      return new HtmlWebpackPlugin({
        filename: path.join(folderName, `${name}.html`),
        template: itemPath,
        inject: true,
        chunks: [`${folderName}/${name}`],
      });
    } else {
      return [];
    }
  });
}

module.exports = generateHtmlPlugins();
