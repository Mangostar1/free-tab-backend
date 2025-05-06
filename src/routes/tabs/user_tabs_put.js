const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

router.put("/tab/user-tab/:id/update", (req, res) => {
  try {
    const id = req.params.id;
    res.send("Aca se veran las tabs creadas");
  } catch (error) {
    console.log("Error editing document: ", error);
    res.status(400).json({ message: error });
  }
});

module.exports = router;
