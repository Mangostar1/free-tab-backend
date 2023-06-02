const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwtToken; // Obtén el token de la cookie

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado." });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY; // Obtén la clave secreta de JWT desde las variables de entorno
    const decoded = jwt.verify(token, secretKey); // Decodifica el token

    req.user = decoded; // Agrega los datos decodificados al objeto de solicitud (req)

    next(); // Pasa al siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;
