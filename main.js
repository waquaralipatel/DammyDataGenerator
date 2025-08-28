// import mongoose from "mongoose"
// import express from "express"
// import { Employees } from "./models/Employees.js"

// const app = express()
// const port = 4000

//  await con = mongoose.connect("mongodb://localhost:27017/");

// async function mainTainZeroDocs() {
//      try {
//         const count = await Employee.countDocuments();
//         if (count > 0) {
//             // await Employee.deleteMany({});
//             await conn.connection.db.dropCollection("employees");
//         }
//     } catch (err) {
//         console.error("Error deleting collection:", err);
//     }
// }
// app.get('/generate', (req, res) => {
    
//      mainTainZeroDocs()
//     //  await dropEmployeesIfExists();

//     let names = ["Alice","Bob","Charlie"];
//     let salaries = [30000,45000,60000];
//     let langs = ["Java", "Python", "JavaScript"]
//     let cities = ["Hyderabad", "US", "United Arab Emerates"]
//     let isManagers = [true, false, true]

//     let i = 10;
//     while (i-- > 0) {
//         let rand = Math.floor(Math.random() * 10) + 1;
//         if (rand >= 0 && rand < 5) {
//             let data = new Employees({ name: names[0], salary: salaries[0], language: langs[0], city: cities[0], isManager: isManagers[0] })
//         } else if (rand >= 5 && rand < 8) {
//             let data = new Employees({ name: names[1], salary: salaries[1], language: langs[1], city: cities[1], isManager: isManagers[1] })
//         } else {
//             let data = new Employees({ name: names[2], salary: salaries[3], language: langs[3], city: cities[3], isManager: isManagers[3] })
//         }
//         data.save()
//     }
//     res.send('Generated Dummay data and Stored into the company DB in Employees collection')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// }) 

import mongoose from "mongoose";
import express from "express";
import { Employees } from "./models/Employees.js";

const app = express();
const port = 4000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Company")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function mainTainZeroDocs() {
  try {
    // Ensure DB connection is ready
    const db = mongoose.connection.db;

    // Check if "employees" collection exists
    const collections = await db.listCollections({ name: "employees" }).toArray();

    if (collections.length > 0) {
      await db.dropCollection("employees");
      console.log("'employees' collection dropped");
    } else {
      console.log("employees collection does not exist, skipping drop");
    }
  } catch (err) {
    console.error("Error deleting collection:", err);
  }
}

app.get("/generate", async (req, res) => {
  // First drop collection if it exists
  await mainTainZeroDocs();

  let names = ["Alice", "Bob", "Charlie"];
  let salaries = [30000, 45000, 60000];
  let langs = ["Java", "Python", "JavaScript"];
  let cities = ["Hyderabad", "US", "United Arab Emirates"];
  let isManagers = [true, false, true];

  // Insert 10 dummy employees
  for (let i = 0; i < 10; i++) {
    let rand = Math.floor(Math.random() * 10) + 1;
    let data;

    if (rand >= 0 && rand < 5) {
      data = new Employees({ name: names[0], salary: salaries[0], language: langs[0], city: cities[0], isManager: isManagers[0] });
    } else if (rand >= 5 && rand < 8) {
      data = new Employees({ name: names[1], salary: salaries[1], language: langs[1], city: cities[1], isManager: isManagers[1] });
    } else {
      data = new Employees({ name: names[2], salary: salaries[2], language: langs[2], city: cities[2], isManager: isManagers[2] }); 
    }

    await data.save(); 
  }

  res.send("✅ Generated dummy data and stored into 'employees' collection in Company DB");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
