import { Pipe, PipeTransform } from '@angular/core';

// OperatorPipe - Converts x to *
@Pipe({
  standalone: true,
  name: 'operator'
})
export class OperatorPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/x/g, '*'); // Replaces all x with *
  }
}

// FormatResultPipe - Formats the result to a fixed length
@Pipe({
  standalone: true,
  name: 'formatResult'
})
export class FormatResultPipe implements PipeTransform {
  transform(value: string | number, length: number = 10): string {
    const num = parseFloat(value.toString());
    if (isNaN(num)) return value.toString(); // If invalid number, return original

    // Limit to specified length and round if necessary
    const rounded = num.toPrecision(length);

    // Return without extra zeroes
    return parseFloat(rounded).toString();
  }
}

