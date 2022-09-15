const express = require("express");
const router = express.Router();
const imgController = require("../controllers/imgController.js");

router.post("/", imgController.upload, imgController.createImage);

router.get("/", imgController.getAllImgs);
router.get("/tour/:tourId", imgController.getTourImgs);
router.get("/poi/:poiId", imgController.getPoiImgs);

router.delete("/tourimg/:poiId", imgController.deleteTourImg);
router.delete("/poiimg/:poiId", imgController.deletePoiImg);

module.exports = router;
