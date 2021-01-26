import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      // imagen de google
      return value;
    } else {
      // sin imagen
      return 'assets/images/avatars/user-male-x128.png';
    }
  }

}
