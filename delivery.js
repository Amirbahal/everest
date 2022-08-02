const readline = require("readline-sync");

let outputDetails = [];

let offerCodes = [
  {
    name: "OFR001",
    discountPercentage: 10,
    allowedDistanceMin: 0,
    allowedDistanceMax: 200,
    allowedWeightMin: 70,
    allowedWeightMax: 200,
  },
  {
    name: "OFR002",
    discountPercentage: 7,
    allowedDistanceMin: 50,
    allowedDistanceMax: 150,
    allowedWeightMin: 100,
    allowedWeightMax: 250,
  },
  {
    name: "OFR003",
    discountPercentage: 5,
    allowedDistanceMin: 50,
    allowedDistanceMax: 250,
    allowedWeightMin: 10,
    allowedWeightMax: 150,
  },
];

function calculatePrice(basePrice, answerArray) {
  // answerArray[0] package id
  // answerArray[1] package weight
  // answerArray[2] package distance
  // answerArray[3] offer code

  const cost = basePrice + answerArray[1] * 10 + answerArray[2] * 5;

  const discountObject = offerCodes.filter((f) => f.name == answerArray[3])[0];
  let discountPercentage = 0;
  if (
    discountObject.allowedDistanceMin < answerArray[2] &&
    discountObject.allowedDistanceMax > answerArray[2] &&
    discountObject.allowedWeightMin < answerArray[1] &&
    discountObject.allowedWeightMax > answerArray[1]
  ) {
    discountPercentage = discountObject?.discountPercentage ?? 0;
  }

  const discount = (cost * discountPercentage) / 100;
  const totalCost = cost - discount;

  outputDetails.push({
    packageID: answerArray[0],
    discount: discount,
    totalCost: totalCost,
  });
}

let basePrice;
let numberOfPackages;

const input = readline.question(
  "Enter base delivery const and the number of packages seperated by space: "
);
console.log("");

const answer = input.split(" ");
if (
  answer.length !== 2 ||
  isNaN(parseInt(answer[0])) ||
  isNaN(parseInt(answer[1]))
) {
  console.log("input is not valid.");
} else {
  basePrice = parseInt(answer[0]);
  numberOfPackages = parseInt(answer[1]);
  getPackagingDetails(basePrice, numberOfPackages);
}

async function getPackagingDetails(basePrice, numberOfPackages) {
  for (let i = 0; i < numberOfPackages; i++) {
    const answer = readline.question(
      `Enter the package number ${
        i + 1
      }'s id, weight, distance and offer code: `
    );

    const answerArray = answer.split(" ");

    calculatePrice(basePrice, answerArray);
  }

  outputDetails.map((item) => {
    console.log(`${item.packageID} ${item.discount} ${item.totalCost}`);
  });
}
