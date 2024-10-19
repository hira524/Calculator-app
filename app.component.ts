import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  displayValue: string = '0';
  number: string = '';
  operatorSign: string = '';


  // Handle calculator button press
  calculate(button: string) {
    switch (button) {
      case '=':
        this.operatorSign = '';
        try {
          this.number = eval(this.number); // Evaluating the math expression
          this.number = '' + this.number; // Convert result back to string
        } catch (e) {
          this.number = 'Error';
        }
        this.displayValue = this.number.slice(0, 12); // Limit display length
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
        if (!this.dotCheck()) {
          this.number += button;
          this.displayValue += button;
        }
        break;

      default: // Handle numbers 0-9
        if (this.operatorCheck() || this.displayValue === '0') {
          this.displayValue = '';
        }
        this.number += button;
        this.displayValue += button;
        this.displayValue = this.displayValue.slice(0, 12); // Limit length
        break;
    }
  }

  // Handle operator sign and its display position
  handleOperator(button: string) {
    if (this.operatorCheck()) {
      this.number = this.number.slice(0, -1); // Replace last operator
    }

    this.operatorSign = button;
    switch (button) {
      case '+':
        this.operatorSign = '+';
        break;
      case '-':
        this.operatorSign = '-';
        break;
      case '/':
        this.operatorSign = '/';
        break;
      case 'x':
        button = '*'; // Replace 'x' with '*' for calculation
        this.operatorSign = 'x';
        break;
    }
    this.number += button;
  }

  // Prevent multiple dots in the same number
  dotCheck(): boolean {
    return this.displayValue.includes('.');
  }

  // Check if the last character is an operator
  operatorCheck(): boolean {
    const lastChar = this.number.charAt(this.number.length - 1);
    return lastChar === '*' || lastChar === '/' || lastChar === '+' || lastChar === '-';
  }

  onButtonClick(buttonValue: string) {
    this.calculate(buttonValue);
  }
}

