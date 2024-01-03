import { FormField } from '@admin/forms/forms.types'
import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    selector: '[checkbox-display]',
    template: `{{ content ? '✓' : '✗' }}`,
})
export class CheckBoxtDisplayComponent {
    @Input() content!: boolean
    @Input() field!: FormField
}
