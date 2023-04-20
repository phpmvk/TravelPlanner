const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/result", controller.getAllTrips);
router.post("/post", controller.createTrip);
router.post("/journey", controller.createJourney);
router.post("/activity", controller.createActivity);
router.get("/trip/:id", controller.getTripById);

module.exports = router;
