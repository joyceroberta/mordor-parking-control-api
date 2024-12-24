import { ParkingService } from "../services/parking.service.js";

export class ParkingController {
  constructor() {
    this.parkingService = new ParkingService();
  }

  async registerEntry(req, res) {
    try {
      const { plate } = req.body;

      const parking = await this.parkingService.register(plate);

      res.status(201).json({ reservation: parking._id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getHistoryForPlate(req, res) {
    try {
      const { plate } = req.params;

      const history = await this.parkingService.getHistory(plate);

      res.status(200).json(history);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // async registerPayment(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const payment = await this.parkingService.payment(id);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }
}
