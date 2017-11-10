import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TipoPontoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tipoPonto',
})
export class TipoPontoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args?: any): any {
    if (value == "1") {
      return 'Acessivel';
    } else {
      return 'Não Acessivel';
    }
  }
}
