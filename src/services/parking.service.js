const Parking = require("../models/parking.model.js");

class ParkingService {
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

    const existingParking = await Parking.findOne({ plate, left: false });

    if (existingParking) {
      if (existingParking.paid && existingParking.left) {
        await Parking.updateOne(
          { _id: existingParking._id },
          { $set: { left: true, paid: true } }
        );

        const parking = new Parking({
          plate: plate.toUpperCase(),
          entryTime: new Date(),
          paid: false,
          left: false,
        });

        await parking.save();
        return parking;
      } else {
        throw new Error(
          "This sign is already registered in the parking lot, check it."
        );
      }
    } else {
      const parking = new Parking({
        plate: plate.toUpperCase(),
        entryTime: new Date(),
        paid: false,
        left: false,
      });

      await parking.save();
      return parking;
    }
  }

  async getHistory(plate) {
    const history = await Parking.find({
      plate: { $regex: `^${plate}$`, $options: "i" },
    });

    function formatDate(date) {
      if (!date) return "Still in parking";
      return new Date(date).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });
    }

    if (history.length === 0) {
      throw new Error("Record not found for the provided board.");
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
        entryDate: formatDate(entryTime),
        exitDate: formatDate(exitTime),
        paid: entry.paid,
        left: entry.left,
      };
    });
  }

  async payment(id) {
    const inTheParking = await Parking.findById(id);

    if (!inTheParking) {
      throw new Error("Record not found for the provided board.");
    }

    if (inTheParking.paid) {
      throw new Error("Payment already made");
    }

    inTheParking.paid = true;
    await inTheParking.save();

    return inTheParking;
  }

  async exit(id) {
    const inTheParking = await Parking.findById(id);

    if (!inTheParking) {
      throw new Error("Record not found for the provided board.");
    }

    if (!inTheParking.paid) {
      throw new Error("Payment not made, exit not allowed.");
    }

    if (inTheParking.left) {
      throw new Error("Vehicle already left the parking.");
    }

    inTheParking.left = true;
    inTheParking.exitTime = new Date();
    await inTheParking.save();

    return inTheParking;
  }
}

module.exports = { ParkingService };
