const express = require("express");
const { ParkingController } = require("../controllers/parking.controller.js");

const router = express.Router();
const parkingController = new ParkingController();

router.post("/", parkingController.registerEntry.bind(parkingController));
router.get(
  "/:plate",
  parkingController.getHistoryForPlate.bind(parkingController)
);
router.put(
  "/:id/pay",
  parkingController.registerPayment.bind(parkingController)
);
router.put("/:id/out", parkingController.registerExit.bind(parkingController));

module.exports = router;
