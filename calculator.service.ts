import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  evaluateExpression(expression: string): string {
    try {
      const result = eval(expression);
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  }
  isOperator(character: string): boolean {
    return ['+', '-', '*', '/'].includes(character);
  }
  containsDot(value: string): boolean {
    return value.includes('.');
  }
}
