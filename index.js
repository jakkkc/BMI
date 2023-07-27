// const express = require("express");
// const app = express();
// const port = 3000;

// app.set("views", "views");
// app.set("view engine", "hbs");
// app.use(express.static("public"));

// app.get("/", function (req, res) {
//   res.render("home", { name: "John Doe" });
// });

// app.listen(port);
// console.log("Node server has started on port 3000");

const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;


app.set("views", "views");
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Check if there is existing data from the JSON file
let bmiData = [];
const jsonDataPath = "bmiData.json";
if (fs.existsSync(jsonDataPath)) {
  const data = fs.readFileSync(jsonDataPath, "utf8");

  if (data.trim().length > 0) {
    try {
      bmiData = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }
}

// Save BMI data to JSON file
function saveBMIData(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(jsonDataPath, jsonData);
}

// Calculate total BMI calculations and average BMI
function calculateBMIStats() {
  let totalCalculations = bmiData.length;
  let totalBMI = 0;
  bmiData.forEach((entry) => {
    totalBMI += entry.bmi;
  });
  let averageBMI = totalBMI / totalCalculations;
  return {
    totalCalculations,
    averageBMI,
  };
}

// render home.hbs
app.get("/", (req, res) => {
  res.render("home");
});

// handle a post request from home.hbs form
app.post("/", (req, res) => {
  const height = Number(req.body.height);
  const weight = Number(req.body.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = weight / (height * height);
    bmiData.push({ height, weight, bmi });
    saveBMIData(bmiData);
  }

  res.redirect("/reports");
});

// get reports from calculation returned from calculateBMIStats function
app.get("/reports", (req, res) => {
  const { totalCalculations, averageBMI } = calculateBMIStats();
  res.render("reports", { totalCalculations, averageBMI });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
