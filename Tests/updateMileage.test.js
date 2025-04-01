// Tests/updateMileage.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../testServer");
const Car = require("../models/car");

// Use a unique test database if you want: `${process.env.MONGO_URI}_test`
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

let testCar;

beforeEach(async () => {
  testCar = new Car({
    userId: "test-user-123",
    vin: "TESTVIN123",
    make: "Test",
    model: "Car",
    year: 2020,
    color: "Blue",
    startingMileage: 1000,
    totalMileage: 1000,
    rateOfChange: 0,
    addedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // one week ago
  });
  await testCar.save();
});

afterEach(async () => {
  await Car.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

test("should update totalMileage and recalculate rateOfChange", async () => {
  const response = await request(app)
    .put(`/api/cars/${testCar._id}/update-mileage`)
    .send({ totalMileage: 1500 });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.car.totalMileage).toBe(1500);
  expect(response.body.car.rateOfChange).toBeGreaterThan(0);
});
