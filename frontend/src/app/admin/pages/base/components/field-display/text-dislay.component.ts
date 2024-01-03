import { FormField } from '@admin/forms/forms.types'
import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    selector: '[text-display]',
    template: `<div class="tooltip" attr.data-tip="{{ field.label }}">
        {{ content }}
    </div>`,
})
export class TextDisplayComponent {
    @Input() content!: string
    @Input() field!: FormField
}
