const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const loggerTime = require("./src/middleware/timeLogger");
const authMiddleware = require("./src/middleware/authMiddleware");
const colors = require("colors");

const PORT = process.env.PORT || 3000;

app.use(loggerTime);

const corsUrl = {
  local: "http://localhost:3000",
  production: "https://free-tabs.netlify.app",
};

app.use(cors({ origin: corsUrl.local, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Routes */
app.use("/", require("./src/routes/apiGuide")); //<-- guide

//Auth - User Session
app.use("/", require("./src/api/auth/signup")); //<-- signup
app.use("/", require("./src/api/auth/login")); //<-- login
app.use("/", require("./src/api/auth/logout")); //<-- logout

// Protege las rutas que requieren autenticación con el middleware deberan estar por debajo de esta linea
app.use(cookieParser());
app.use(authMiddleware); //<-- aquí se agrega el middleware antes de las rutas protegidas

//API
app.use("/", require("./src/api/users/user")); //<-- get user data in auth firestore
app.use("/", require("./src/api/users/user-put")); //<-- to update used data
app.use("/", require("./src/api/tabs/user_tabs_post")); //<-- Add New Tab
app.use("/", require("./src/api/tabs/user_tabs_get")); //<-- get Tabs on DB
app.use("/", require("./src/api/tabs/user_tabs_put")); //<-- update a Tabs on DB
app.use("/", require("./src/api/tabs/user_tabs_delete")); //<-- delete a Tabs on DB

//404 Error
app.use((req, res, next) => {
  res.status(404).json({ message: "Error 404, ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
