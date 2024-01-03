/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'multi-dynamic-select-display',
    // template: `<div>
    //     @for (item of content | async; track item) {
    //         <div>{{ item }}</div>
    //     }
    // </div>`,
    template: `<div>
        <div>{{ content }}</div>
    </div>`,
})
export class MultiDynamicSelectDisplayComponent {
    @Input() content!: any
}
