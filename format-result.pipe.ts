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
  transform(value: string | number, length: number = 10): string {
    const num = parseFloat(value.toString());
    if (isNaN(num)) return value.toString();
    const rounded = num.toPrecision(length);
    return parseFloat(rounded).toString();
  }
}
