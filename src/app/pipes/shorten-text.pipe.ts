import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length <= 20) {
      return value;
    }
    return value.substring(0,20) + '...';
  }

}
