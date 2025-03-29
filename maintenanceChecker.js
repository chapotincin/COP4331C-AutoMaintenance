const mongoose = require("mongoose");
const Car = require("./models/car.js");
const User = require("./models/user.js");
const sendMaintenanceEmail = require("./sendEmailMaintenance.js");
require("dotenv").config();

const MAINTENANCE_TABLE = [
  [5000, 9999, ["Change oil"]],
  [10000, 14999, ["Change oil", "Change Air Filter", "Change Cabin Filter"]],
  [15000, 19999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [20000, 24999, ["Change oil", "Change Air Filter", "Change Cabin Filter"]],
  [25000, 29999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [30000, 34999, ["Change oil", "Change Air Filter", "Change Cabin Filter", "Change Spark Plugs"]],
  [35000, 39999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [40000, 44999, ["Change oil", "Change Air Filter", "Change Cabin Filter"]],
  [45000, 49999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [50000, 54999, ["Change oil", "Change Air Filter", "Change Cabin Filter", "Change Timing Chain/Belt"]],
  [55000, 59999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [60000, 64999, ["Change oil", "Change Air Filter", "Change Cabin Filter", "Change Spark Plugs"]],
  [65000, 69999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [70000, 74999, ["Change oil", "Change Air Filter", "Change Cabin Filter"]],
  [75000, 79999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [80000, 84999, ["Change oil", "Change Air Filter", "Change Cabin Filter"]],
  [85000, 89999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [90000, 94999, ["Change oil", "Change Air Filter", "Change Cabin Filter", "Change Spark Plugs"]],
  [95000, 99999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [100000, 104999, ["Change oil", "Change Air Filter", "Change Cabin Filter", "Change Timing Chain/Belt"]],
  [105000, 109999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [110000, 114999, ["Change oil", "Change Air Filter", "Change Cabin Filter"]],
  [115000, 119999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [120000, 124999, ["Change oil", "Change Air Filter", "Change Cabin Filter", "Change Spark Plugs"]],
  [125000, 129999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [130000, 134999, ["Change oil", "Change Air Filter", "Change Cabin Filter"]],
  [135000, 139999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [140000, 144999, ["Change oil", "Change Air Filter", "Change Cabin Filter"]],
  [145000, 149999, ["Change oil", "Change Coolant", "Rotate Tires"]],
  [150000, 1000000, ["Change oil", "Change Air Filter", "Change Cabin Filter", "Change Timing Chain/Belt"]],
];

function getMaintenanceRange(mileage) {
  for (let [min, max, tasks] of MAINTENANCE_TABLE) {
    if (mileage >= min && mileage <= max) {
      return { max, tasks };
    }
  }
  return null;
}

async function checkMaintenance() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    const cars = await Car.find({});
    for (let car of cars) {
      const range = getMaintenanceRange(car.totalMileage);

      if (range && (!car.lastMaintenanceNotified || range.max > car.lastMaintenanceNotified)) {
        const user = await User.findOne({ userId: car.userId });
        if (!user) continue;

        const subject = "Scheduled Maintenance Reminder";
        const plainText = `
Hello ${user.firstName},

Your ${car.year} ${car.make} ${car.model} (VIN: ${car.vin}) is due for scheduled maintenance.

Current Mileage: ${car.totalMileage} miles

Recommended actions:
- ${range.tasks.join("\n- ")}

Please attend to these tasks to keep your vehicle in good condition.

- Carlogix
        `;

        const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <img src="http://www.carlogix.xyz/assets/Logo.png" alt="CarLogix Logo" style="max-width: 180px; margin-bottom: 20px;" />
          <h2>Scheduled Maintenance Reminder</h2>
          <p>Hello ${user.firstName},</p>
          <p>Your <strong>${car.year} ${car.make} ${car.model}</strong> (VIN: <code>${car.vin}</code>) is due for scheduled maintenance.</p>
          <p><strong>Current Mileage:</strong> ${car.totalMileage} miles</p>
          <p><strong>Recommended Actions:</strong></p>
          <ul>${range.tasks.map(task => `<li>${task}</li>`).join("")}</ul>
          <p>Take action soon to ensure your vehicle remains in optimal condition.</p>
          <p style="margin-top: 40px;">– The CarLogix Team</p>
        </div>
        `;

        await sendMaintenanceEmail(user.email, subject, plainText, html);
        console.log(`✅ Maintenance alert sent for ${car.vin} to ${user.email}`);

        car.lastMaintenanceNotified = range.max;
        await car.save();
      }
    }
  } catch (err) {
    console.error("🔴 Error during maintenance check:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

setInterval(checkMaintenance, 60 * 1000);
console.log("🔧 Maintenance checker started...");
