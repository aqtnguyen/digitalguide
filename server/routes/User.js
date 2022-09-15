const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const userController = require("../controllers/userController.js");

router.post("/", userController.createAdmin);
router.post("/login", userController.loginAdmin);
router.post("/resetpassword", userController.resetPassword);

router.get("/auth", validateToken, userController.getAdminStatus);
router.get("/:adminId", userController.getAdminInfo);

router.put("/changepassword", validateToken, userController.updatePassword);
router.put("/changeemail", validateToken, userController.updateEmail);
router.put("/newpassword/:id", userController.newPassword);

module.exports = router;
