// Function to find the maximum product of adjacent elements in an array.
function findMaxProduct(tokens: number[]): number {
  let result = 0;

  // Iterate through the array to find the maximum product of adjacent elements
  for (let i = 0; i < tokens.length - 1; i++) {
    const product = tokens[i] * tokens[i + 1];

    // Check if the result is within the 32-bit integer range
    if (isWithin32BitIntRange(result)) {
      // If the current product is greater than the current result, update the result
      if (result < product) {
        result = product;
      }
    } else {
      throw new Error(`Result exceeds 32-bit Integer range`);
    }
  }

  return result;
}

// Function to check if a number is within the 32-bit integer range.
function isWithin32BitIntRange(num: number): boolean {
  return num >= -2147483648 && num <= 2147483647;
}

// Function to validate an array of numbers based on constraints.
function validateNumber(tokens: number[]): void {
  // Check the length constraint (1 <= tokens.length <= 104)
  if (tokens.length < 1 || tokens.length > 2 * 104) {
    throw new Error(`Array length exceeded`);
  }

  // Check the range constraint for each numeric element
  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      // Check if the numeric element is within the range [-10, 10]
      if (Number(token) < -10 || Number(token) > 10) {
        throw new Error(`Number out of range`);
      }
    }
  }
}

// Main function to calculate the maximum product of adjacent elements in an array.
const maxProduct = async () => {
  console.log("=====FIND MAX PRODUCT=====");
  try {
    const tokens = [2, 3, -2, 4];
    console.log(`Input array: ${tokens}`);

    // Validate the input array
    validateNumber(tokens);

    // Find and display the maximum product
    const result = findMaxProduct(tokens);
    console.log(`\nResult: ${result}`);
  } catch (error: any) {
    console.log("\n");
    console.log(error.toString());
  }
};

maxProduct();
