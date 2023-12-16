import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'date-display',
    template: `{{ content | date: 'dd/MM/yyyy' }}`,
})
export class DateDisplayComponent {
    @Input() content!: Date
}
