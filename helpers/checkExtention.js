const checkExtention = (filename) => {
  const EXTENTIONS = ["txt", "js", "html", "css", "json"];

  const extArr = filename.split(".");
  const ext = extArr[extArr.length - 1];
  
  const isInExt = EXTENTIONS.includes(ext);
  return { extention: ext, result: isInExt };
};

module.exports = checkExtention;


