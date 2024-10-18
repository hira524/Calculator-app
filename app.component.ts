
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayValue: string = '0';
  number: string = '';
  operatorSign: string = '';
  constructor() {}
  calculate(button: string) {
    switch (button) {
      case '=':
        this.operatorSign = '';
        try {
          this.number = eval(this.number.replace('x', '*')); // Using eval to evaluate the expression
          this.displayValue = this.number.toString().slice(0, 12);  // Limit display length
        } catch (e) {
          this.number = 'Error';
          this.displayValue = 'Error';
        }
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
        if (this.number !== '' && !this.isOperator(this.number.slice(-1))) {
          this.number += button;
          this.operatorSign = button;
          this.displayValue = this.number;
        }
        break;
      case '.':
        if (!this.displayValue.includes('.')) {
          this.number += button;
          this.displayValue += button;
        }
        break;
      default:
        if (this.isOperator(this.number) || this.displayValue === '0') {
          this.displayValue = '';
        }
        this.number += button;
        this.displayValue += button;
        this.displayValue = this.displayValue.slice(0, 12);
        break;
    }
  }
  onButtonClick(buttonValue: string) {
    this.calculate(buttonValue);
  }
  isOperator(value: string) {
    return ['+', '-', '/', 'x'].includes(value);
  }
}
