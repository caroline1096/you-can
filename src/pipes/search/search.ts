import {Injectable, Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
@Injectable()
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return _.filter(value, d => _.find(_.valuesIn(d), v =>
        _.toLower(v).indexOf(_.toLower(args)) !== -1));
    }
    return value;
  }
}
