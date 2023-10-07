function findMaxProduct(tokens: number[]): number {
  let result = 0;
  for (let i = 0; i < tokens.length - 1; i++) {
    const pdt = tokens[i] * tokens[i + 1];
    if (result < pdt) {
      result = pdt;
    }
  }
  return result;
}
// Function to check if a number is within the 32-bit integer range
function isWithin32BitIntRange(num: number): boolean {
  return num >= -2147483648 && num <= 2147483647;
}

// Function to validate tokens based on constraints
function validateNumber(tokens: number[]) {
  // Check the length constraint (1 <= tokens.length <= 104)
  if (tokens.length < 1 || tokens.length > 104) {
    throw new Error(`Array length exceeded`);
  }

  // Check the range constraint for each numeric string
  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      if (Number(token) < -200 || Number(token) > 200) {
        throw new Error(`Number out of range`);
      }
    }
  }
}

// Main function to calculate the Reverse Polish Notation expression
const maxProduct = async () => {
  console.log("=====FIND MAX PRODUCT=====");
  try {
    const tokens = [2, 3, -2, 4];
    console.log(`Input array: ${tokens}`);

    await validateNumber(tokens);

    const result = await findMaxProduct(tokens);
    console.log(`\nResult: ${result}`);
  } catch (error: any) {
    console.log("\n");
    console.log(error.toString());
  }
};

maxProduct();
