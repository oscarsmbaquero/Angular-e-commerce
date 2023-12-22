// dash-if-null.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashIfNull'
})
export class DashIfNullPipe implements PipeTransform {
  transform(value: any): any {
    return value !== null && value !== undefined ? value : '-';
  }
}
