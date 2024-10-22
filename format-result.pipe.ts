import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  standalone: true,
  name: 'operator'
})
export class OperatorPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/x/g, '*');
  }
}

@Pipe({
  standalone: true,
  name: 'formatResult'
})

export class FormatResultPipe implements PipeTransform {
  transform(value: string | number, decimalLimit: number = 4): string {
    const num = parseFloat(value.toString());
    if (isNaN(num)) return value.toString();
    if (Number.isInteger(num)) {
      return num.toString();
    }
    const formattedValue = num.toFixed(decimalLimit);
    return parseFloat(formattedValue).toString();
  }
}

