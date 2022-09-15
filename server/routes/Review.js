const express = require("express");
const router = express.Router();
const revController = require("../controllers/revController.js");

router.post("/", revController.createReview);

router.get("/:tourId", revController.getListedReviews);
router.get("/:tourId/:touristId", revController.getTouristReview);

router.delete("/:tourId/:touristId", revController.deleteReview);

module.exports = router;
