const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const loggerTime = require("./src/middleware/logger");
const colors = require("colors");

const PORT = process.env.PORT || 3000;

app.use(loggerTime);

//<-- usar le valor true para desarollo en local
//<-- usar le valor 'https://free-tabs.netlify.app/' para desarollo en produccion
app.use(cors({ origin: "https://free-tabs.netlify.app/", credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Routes */
app.use("/", require("./routes/apiGuide")); //<-- guide

//Auth - User Session
app.use("/", require("./api/signup")); //<-- signup
app.use("/", require("./api/login")); //<-- login
app.use("/", require("./api/logout")); //<-- logout

//API
app.use("/", require("./api/addNewTab")); //<-- Add New Tab
app.use("/", require("./routes/showTabs")); //<-- Send Tabs In DB
app.use("/", require("./routes/users")); //<-- Send Users In DB

//404 Error
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`.bgGreen);
});
