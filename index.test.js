// Import the functions to be tested
const { calculateBMI, calculateBMIStats } = require("./index.js"); // Replace './your-bmi-utils' with the correct path to the BMI utility file

// Test suite for calculateBMI
describe("calculateBMI", () => {
  // Test case: Valid height and weight inputs
  test("should calculate BMI correctly for valid height and weight", () => {
    const height = 1.75;
    const weight = 68.5;
    const expectedBMI = 22.38; // Replace with the expected BMI value for the given height and weight
    const result = calculateBMI(height, weight);
    expect(result).toBe(expectedBMI);
  });

  // Test case: Invalid height or weight inputs
  test("should return null for invalid height or weight", () => {
    const height = "invalidHeight";
    const weight = 90;
    const result = calculateBMI(height, weight);
    expect(result).toBeNull();
  });
});

// Test suite for calculateBMIStats
describe("calculateBMIStats", () => {
  // Test case: Calculate BMI stats when bmiData has entries
  test("should calculate BMI stats correctly when bmiData has entries", () => {
    const bmiData = [
      { height: 1.75, weight: 68.5, bmi: 22.38 },
      { height: 1.8, weight: 75.0, bmi: 23.15 },
      { height: 1.6, weight: 55.0, bmi: 21.48 },
      // Add more test data if needed
    ];

    const expectedTotalCalculations = bmiData.length;
    const expectedTotalBMI = bmiData.reduce((acc, entry) => acc + entry.bmi, 0);
    const expectedAverageBMI = expectedTotalBMI / expectedTotalCalculations;

    const result = calculateBMIStats(bmiData);
    expect(result).toEqual({
      totalCalculations: expectedTotalCalculations,
      averageBMI: expectedAverageBMI,
    });
  });

  // Test case: Calculate BMI stats when bmiData is empty
  test("should return zero totalCalculations and NaN averageBMI when bmiData is empty", () => {
    const emptyBmiData = [];
    const result = calculateBMIStats(emptyBmiData);
    expect(result).toEqual({
      totalCalculations: 0,
      averageBMI: NaN,
    });
  });
});
