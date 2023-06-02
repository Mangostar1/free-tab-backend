const loggerTime = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(
    `[${timestamp}] Request received - ${req.method} ${req.url}`.bgWhite
  );
  next();
};

module.exports = loggerTime;
