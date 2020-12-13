import {Pipe, PipeTransform} from '@angular/core';

/*
 * Appends given unit to value if value !== unknown, else just value
 *  Default unit is ''
 * Usage:
 *   value | unit:unitname
 * Example:
 *   {{ 150 | unit:'cm' }}
 *   formats to: 150cm
*/
@Pipe({name: 'unit'})
export class UnitPipe implements PipeTransform {
  transform(value?: string, unit?: string): string {
    if (value) {
      if (value !== 'unknown' && value !== 'N/A') {
        return value + unit;
      } else {
        return value;
      }
    }
    return ' ';
  }
}
