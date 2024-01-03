/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'dynamic-select-display',
    template: ` <div>{{ content }}</div> `,
    // template: ` <div>{{ content | async }}</div> `,
})
export class DynamicSelectDisplayComponent {
    @Input() content!: any
}
