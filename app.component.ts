import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { OperatorPipe, FormatResultPipe } from './format-result.pipe';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [OperatorPipe, FormatResultPipe],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayValue: string = '0';
  number: string = '';
  operatorSign: string = '';
  constructor(private calculatorService: CalculatorService) {}

  calculate(button: string) {
    const operatorPipe = new OperatorPipe();
    const formatResultPipe = new FormatResultPipe();
    switch (button) {
      case '=':
        this.operatorSign = '';
        try {
          this.number = operatorPipe.transform(this.number);
          this.number = this.calculatorService.evaluateExpression(this.number);
          this.number = formatResultPipe.transform(this.number);
        } catch (e) {
          this.number = 'Error';
        }
        this.displayValue = this.number;
        break;
      case 'RESET':
        this.number = '';
        this.displayValue = '0';
        break;
      case 'DEL':
        this.number = this.number.slice(0, -1);
        this.displayValue = this.displayValue.slice(0, -1);
        if (this.displayValue === '') this.displayValue = '0';
        break;
      case '+':
      case '-':
      case '/':
      case 'x':
        this.handleOperator(button);
        break;

      case '.':
       if (!this.calculatorService.containsDot(this.displayValue)) {
          this.number += button;
          this.displayValue += button;
        }
        break;
      default:
        if (this.calculatorService.isOperator(this.number.slice(-1)) || this.displayValue === '0') {
          this.displayValue = '';
        }
        this.number += button;
        this.displayValue += button;
        this.displayValue = this.displayValue.slice(0, 10);
        break;
    }
  }
  handleOperator(button: string) {
    const operatorPipe = new OperatorPipe();
    if (this.calculatorService.isOperator(this.number.slice(-1))) {
      this.number = this.number.slice(0, -1);
    }
    this.operatorSign = button;
    this.number += operatorPipe.transform(button);
  }
  onButtonClick(buttonValue: string) {
    this.calculate(buttonValue);
  }
}
