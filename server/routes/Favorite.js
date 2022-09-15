const express = require("express");
const router = express.Router();
const favController = require("../controllers/favController.js");

router.post("/", favController.createFav);

router.get("/:touristId", favController.getListedFavs);
router.get("/:tourId/:touristId", favController.getCheckedFavs);

router.delete("/:tourId/:touristId", favController.deleteFav);

module.exports = router;
