import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vndCurrency'
})
export class VndCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    let outputValue = ''
    let x = value.toString();

    for (let index = x.length-1; index >= 0; index--) {
      if ((x.length-index) % 3 === 0 && index !== 0) {
        outputValue = '.' + x[index] + outputValue 
      } else {
        outputValue = x[index] + outputValue 
      }
      
    }
    return outputValue + ' VND'
  }

}
