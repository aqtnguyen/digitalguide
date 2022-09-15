const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const touristController = require("../controllers/touristController.js");

router.post("/", touristController.createTourist);
router.post("/login", touristController.loginTourist);
router.post("/resetpassword", touristController.resetPassword);

router.get("/auth", validateToken, touristController.getTouristStatus);
router.get("/:touristId", touristController.getTouristInfo);

router.put("/changepassword/:id", touristController.updatePassword);
router.put("/changeemail/:id", touristController.updateEmail);
router.put("/newpassword/:id", touristController.newPassword);
router.put("/adddescription/:id", touristController.addDescription);

module.exports = router;
