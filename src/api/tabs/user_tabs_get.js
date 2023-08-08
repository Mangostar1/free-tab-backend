const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//firebase
const { getFirestore, getDocs, collection } = require("firebase/firestore");
const app = require("../../config/firebaseConfig.js");
const db = getFirestore(app);

router.get("/api/user-tab", async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users-tabs"));
    const dataArray = [];

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      dataArray.push(doc.data());
    });

    res.json(dataArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
/* 
  Controlar a quien se le envian las tabs consultando el campo "user" 
  para comparar el correo de quien consulta con el la tab creada para 
  asi no enviar al usuario tablaturas que no le pertenecen y evitar 
  modificaciones de datos.
*/
