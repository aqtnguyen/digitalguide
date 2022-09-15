const express = require("express");
const router = express.Router();
const poiController = require("../controllers/poiController.js");

router.post("/", poiController.upload, poiController.createPoi);

router.get("/", poiController.getAllPois);
router.get("/:adminId", poiController.getAdminPois);
router.get("/list/:tourId", poiController.getPoiFromTour);
router.get("/list/:adminId/:data", poiController.getFilteredPois);
router.get("/:adminId/:data/:order", poiController.getOrderedPois);
router.get("/poidetail/:id", poiController.getPoiDetail);

router.put("/:id", poiController.updatePoi);
router.put("/removepoi/:id", poiController.removePoi);
router.put("/addcounter/:id", poiController.addCounter);

router.delete("/:adminId/:poiId", poiController.deletePoi);
// router.delete("/poioftour/:adminId/:tourId", poiController.deletePoiFromTour);

module.exports = router;
