const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/result", controller.getSearchTrips);
router.post("/post", controller.createTrip);
router.post("/journey", controller.createJourney);
router.post("/activity", controller.createActivity);
router.get("/trip/:id", controller.getTripById);
router.get("/modify", controller.getTripByUser);
router.delete("/modify", controller.deleteJourney);

module.exports = router;
