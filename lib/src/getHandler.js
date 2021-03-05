const getHandler = (page) => (req) => {
  if (!page) throw new Error("Page route generation not found");
  const handler = require(`${process.cwd()}/pages/${page}`);

  return handler(req);
};

module.exports = getHandler;
