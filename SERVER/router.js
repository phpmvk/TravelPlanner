const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/explore", controller.getAllTrips);
router.post("/post", controller.createTrip);
router.post("/journey", controller.createJourney);
router.post("/activity", controller.createActivity);

module.exports = router;
