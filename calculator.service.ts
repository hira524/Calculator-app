import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  // Evaluates the expression safely
  evaluateExpression(expression: string): string {
    try {
      // Use JavaScript's eval function to evaluate the math expression
      const result = eval(expression);
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  }

  // Check if the last character is an operator
  isOperator(character: string): boolean {
    return ['+', '-', '*', '/'].includes(character);
  }

  // Prevent multiple dots in the same number
  containsDot(value: string): boolean {
    return value.includes('.');
  }
}
