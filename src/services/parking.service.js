import Parking from "../models/parking.model.js";

export class ParkingService {
  async register(plate) {
    if (!plate) {
      throw new Error("You must enter the license plate number.");
    }

    const plateValidation = /^[A-Z]{3}-\d{4}$/i;

    if (!plateValidation.test(plate)) {
      throw new Error(
        "Invalid entry. The license plate must be in ABC-1234 format."
      );
    }

    const existingParking = await Parking.findOne({ plate });
    if (existingParking) {
      throw new Error(
        "This sign is already registered in the parking lot, check it."
      );
    }

    const parking = new Parking({
      plate: plate.toUpperCase(),
      entryTime: new Date(),
      paid: false,
      left: false,
    });

    await parking.save();
    return parking;
  }

  async getHistory(plate) {
    const history = await Parking.find({ plate });

    if (history.length === 0) {
      throw new Error("Register not found");
    }

    return history.map((entry) => {
      const entryTime = new Date(entry.entryTime);
      const exitTime = entry.exitTime ? new Date(entry.exitTime) : null;

      const time = exitTime
        ? Math.floor((exitTime - entryTime) / 60000) + " minutes"
        : "Still in parking";

      return {
        id: entry._id,
        time: time,
        paid: entry.paid,
        left: entry.left,
      };
    });
  }

  // async payment(id){

  // }
}
