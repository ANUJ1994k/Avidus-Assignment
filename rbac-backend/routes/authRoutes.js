const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
} = require("../controllers/authController");

router.get("/test", (req, res) => {
    res.send("Auth Route Working");
  });
router.post("/signup", signup);

router.post("/signin", signin);

module.exports = router;