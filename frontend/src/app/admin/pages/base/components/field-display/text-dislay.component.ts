import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    selector: 'text-display',
    template: `{{ content }}`,
})
export class TextDisplayComponent {
    @Input() content!: string
    constructor() {}
}
