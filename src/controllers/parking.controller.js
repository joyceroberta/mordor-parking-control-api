const { ParkingService } = require("../services/parking.service.js");

class ParkingController {
  constructor() {
    this.parkingService = new ParkingService();
  }

  async registerEntry(req, res) {
    try {
      const { plate } = req.body;

      const result = await this.parkingService.register(plate);

      res.status(201).json({ reservation: result._id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getHistoryForPlate(req, res) {
    try {
      const { plate } = req.params;

      const result = await this.parkingService.getHistory(plate);

      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async registerPayment(req, res) {
    const { id } = req.params;
    try {
      await this.parkingService.payment(id);
      res.status(200).json({ message: "Payment made successfully." });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async registerExit(req, res) {
    const { id } = req.params;
    try {
      await this.parkingService.exit(id);
      res.status(200).json({
        message: "Payment made, output released.",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = { ParkingController };
