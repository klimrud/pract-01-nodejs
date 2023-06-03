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
   const {extention, result} =  checkExtention(filename);
  //  console.log('result', result)

   if (result === false) {
    console.log(chalk.red(`Sorry, this application doesn't support files with '${extention}' extention`));
    return;

   }

   
};

module.exports = { createFile };
