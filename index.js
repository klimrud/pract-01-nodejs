// index.js
const argv = require("yargs").argv;
const { createFile, getFiles, getFile } = require("./files");

function invokeAction({ action, filename, content }) {
  switch (action) {
    case "create":
      createFile(filename, content);
      break;

    case "get":
      getFiles()
      break;

    case "getInfo":
      getFile(filename)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
