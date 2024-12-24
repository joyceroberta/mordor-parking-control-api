import express from "express";
import { ParkingController } from "../controllers/parking.controller.js";

const router = express.Router();
const parkingController = new ParkingController();

router.post("/", parkingController.registerEntry.bind(parkingController));
router.get(
  "/:plate",
  parkingController.getHistoryForPlate.bind(parkingController)
);
// router.put("/:id/pay", controller.registerPayment);
// router.put("/:id/out", controller.out);

export default router;
