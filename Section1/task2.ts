// Function to check if a number is within the 32-bit integer range
function isWithin32BitIntegerRange(num: number): boolean {
  return num >= -2147483648 && num <= 2147483647;
}

// Function to evaluate a postfix expression
function evaluatePostfixExpression(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      // If the token is a number, push it onto the stack
      stack.push(Number(token));
    } else {
      // If the token is an operator, pop the last two numbers from the stack
      const operand2 = stack.pop();
      const operand1 = stack.pop();

      if (operand1 === undefined || operand2 === undefined) {
        throw new Error("Invalid postfix expression");
      }

      // Perform the operation and push the result back onto the stack
      let result: number = 0;
      switch (token) {
        case "+":
          result = operand1 + operand2;
          break;
        case "-":
          result = operand1 - operand2;
          break;
        case "*":
          result = operand1 * operand2;
          break;
        case "/":
          if (operand2 == 0) throw new Error(`Division by zero not allowed`);
          result =
            operand1 / operand2 < 0
              ? Math.ceil(operand1 / operand2)
              : Math.floor(operand1 / operand2);
          break;
        default:
          throw new Error(`Unsupported operator: ${token}`);
      }
      if (isWithin32BitIntegerRange(result)) {
        stack.push(result);
      } else {
        throw new Error(`Result exceeds 32-bit Integer range`);
      }
    }
  }

  // The final result should be on the stack
  if (stack.length !== 1) {
    throw new Error("Invalid postfix expression");
  }

  return stack[0];
}

// Function to validate tokens based on constraints
function validateTokens(tokens: string[]) {
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
const calculateRpnExpression = async () => {
  console.log("=====CALCULATE REVERSE POLISH NOTATION=====");
  try {
    const tokens = ["4", "2", "+", "5", "*", "4", "/"];
    console.log(`Input array: ${tokens}`);

    await validateTokens(tokens);

    const result = await evaluatePostfixExpression(tokens);
    console.log(`\nResult: ${result}`);
  } catch (error: any) {
    console.log("\n");
    console.log(error.toString());
  }
};

calculateRpnExpression();
