const ipConnectionLog = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Solicitud recibida desde la dirección IP: ${ip}`);
  next();
}

module.exports = ipConnectionLog;