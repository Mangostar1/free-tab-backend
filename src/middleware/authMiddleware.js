const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token is invalid or expired." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    
    // Configurar el tiempo de expiración a 1 hora (3600 segundos)
    const options = { expiresIn: '1h' };

    const decoded = jwt.verify(token, secretKey, options);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization." });
  }
};

module.exports = authMiddleware;
