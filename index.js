import express from "express";
const app = express();

/* dependencias */
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";

/* middleware */
import {loggerTime} from "./src/middleware/timeLogger.js";
import {authMiddleware} from "./src/middleware/authMiddleware.js";

/* routes */

// Auth - User Session
import signupRoute from "./src/routes/auth/signup.js";
import loginRoute from "./src/routes/auth/login.js";
import logoutRoute from "./src/routes/auth/logout.js";

// API
import userRoute from "./src/routes/users/user.js";
import userPutRoute from "./src/routes/users/user-put.js";
import userTabsPostRoute from "./src/routes/tabs/user_tabs_post.js";
import userTabsGetRoute from "./src/routes/tabs/user_tabs_get.js";
import userTabsPutRoute from "./src/routes/tabs/user_tabs_put.js";
import userTabsDeleteRoute from "./src/routes/tabs/user_tabs_delete.js";

const PORT = process.env.PORT || 3000;

app.use(loggerTime);

const corsUrl = {
  local: "http://localhost:3000",
  production: "https://free-tabs.netlify.app",
};

app.use(cors({ origin: corsUrl.local, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Auth - User Session
app.use("/", signupRoute); //<-- signup
app.use("/", loginRoute); //<-- login
app.use("/", logoutRoute); //<-- logout

// Protege las rutas que requieren autenticación con el middleware deberan estar por debajo de esta linea
app.use(cookieParser());
app.use(authMiddleware); //<-- aquí se agrega el middleware antes de las rutas protegidas

//API
app.use("/", userRoute); //<-- get user data in auth firestore
app.use("/", userPutRoute); //<-- to update used data
app.use("/", userTabsPostRoute); //<-- Add New Tab
app.use("/", userTabsGetRoute); //<-- get Tabs on DB
app.use("/", userTabsPutRoute); //<-- update a Tabs on DB
app.use("/", userTabsDeleteRoute); //<-- delete a Tabs on DB

//404 Error
app.use((req, res, next) => {
  res.status(404).json({ message: "Error 404, ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
