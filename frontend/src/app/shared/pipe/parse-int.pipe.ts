import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'parseInt',
})
export class ParseIntPipe implements PipeTransform {
    transform(value: string, radix: number = 10): number {
        return parseInt(value, radix)
    }
}
