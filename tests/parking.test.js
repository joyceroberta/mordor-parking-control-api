jest.setTimeout(30000);

const request = require("supertest");
const app = require("../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Mordor Parking API Tests", () => {
  let reservation;

  it("should register a new parking entry", async () => {
    const response = await request(app)
      .post("/parking")
      .send({ plate: "AAA-9999" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("reservation");
    reservation = response.body.reservation;
  });

  it("must validate the license plate mask", async () => {
    const response = await request(app)
      .post("/parking")
      .send({ plate: "AAA9999" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid entry. The license plate must be in ABC-1234 format."
    );
  });

  it("should not allow exit without payment", async () => {
    const response = await request(app).put(`/parking/${reservation}/out`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Payment not made, exit not allowed."
    );
  });

  it("should allow payment for a parking entry", async () => {
    const response = await request(app).put(`/parking/${reservation}/pay`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Payment made successfully."
    );
  });

  it("should allow exit after payment", async () => {
    const response = await request(app).put(`/parking/${reservation}/out`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Payment made, output released."
    );
  });

  it("should get parking history by plate", async () => {
    const response = await request(app).get("/parking/AAA-9999");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
