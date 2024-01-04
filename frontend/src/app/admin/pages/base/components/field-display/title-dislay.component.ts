import { FormField } from '@admin/forms/forms.types'
import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    selector: '[title-display]',
    template: `<div class="tooltip" attr.data-tip="{{ field.label }}">
        <h4 class="text-sm font-bold text-base-content">{{ content }}</h4>
    </div>`,
})
export class TitleDisplayComponent {
    @Input() content!: string
    @Input() field!: FormField
}
