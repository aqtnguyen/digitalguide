const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController.js");

router.post("/", tourController.upload, tourController.createTour);

router.get("/", tourController.getAllTours);
router.get("/:adminId", tourController.getAdminTours);
router.get("/createdtour/:tourId", tourController.getTourForAssemble);
router.get("/list/:adminId/:data", tourController.getFilteredTours);
router.get("/:adminId/:data/:order", tourController.getOrderedTours);
router.get("/:data/:order", tourController.getOrderedMobile); // orderedMobile
router.get(
  "/searchfilter/:term/:duration/:distance",
  tourController.getToursFromMobileSearch
); // FilterScreen

router.put("/:id", tourController.updateTour);
router.put("/completetour/:id", tourController.completeTour);
router.put("/addcounter/:id", tourController.addCounter);

router.delete("/:adminId/:tourId", tourController.deleteTour);

module.exports = router;
