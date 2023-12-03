import { Pipe, PipeTransform } from '@angular/core'
import { formatDistance } from 'date-fns'
import { fr } from 'date-fns/locale'

@Pipe({
    name: 'dateDistance',
})
export class DateDistancePipe implements PipeTransform {
    transform(value: string | Date, addSuffix: boolean = false): string {
        const date = typeof value === 'string' ? new Date(value) : value
        return formatDistance(date, new Date(), {
            addSuffix: addSuffix,
            locale: fr,
        })
    }
}
