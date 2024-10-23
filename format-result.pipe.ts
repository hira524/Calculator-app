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
    const num = +value;
    return isNaN(num) ? value.toString() : num.toFixed(decimalLimit).replace(/\.?0+$/, '');
  }
}

