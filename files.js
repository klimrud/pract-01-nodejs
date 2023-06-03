const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

const createFile = async (filename, content) => {
  const file = { filename, content };

  const { error } = dataValidator(file);
  if (error) {
    const err = error.details[0].path[0];

    console.log(chalk.red(`Please specify "${err}" parameter`));
    return;
  }
  const { extention, result } = checkExtention(filename);
  //  console.log('result', result)

  if (result === false) {
    console.log(
      chalk.red(
        `Sorry, this application doesn't support files with '${extention}' extention`
      )
    );
    return;
  }

  try {
    await fs.writeFile(
      path.join(__dirname, "./files", filename),
      content,
      "utf-8"
    );
    console.log(chalk.blue("File was created successfully"));
  } catch (error) {
    console.log(error.message);
  }
};

const getFiles = async () => {
  try {
    const data = await fs.readdir(path.join(__dirname, "./files"));
  } catch (error) {
    console.log(error.message);
  }

  if (!data.length) {
    console.log(chalk.red("No files in this directory"));
    return;
  }

  console.log("data🚀  => ", data);
};

const getFile = async (filename) => {
  try {
    const data = await fs.readdir(path.join(__dirname, "./files"));

    const isIncludes = data.includes(filename);

    if (!isIncludes) {
      console.log(chalk.red("This file doesn`t exist"));
      return;
    }

    const result = await fs.readFile(
      path.join(__dirname, "./files", filename),
      "utf-8"
    );

    const extantion = path.extname(filename);
    const name = path.basename(filename, extantion);

    const fileInfo = { name, extantion, content: result };
    console.log("fileInfo - ", fileInfo);

    //  {name: path.basename, extantion: path.extname, content}
  } catch (error) {}
};

module.exports = { createFile, getFiles, getFile };
