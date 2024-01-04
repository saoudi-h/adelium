import { FormField } from '@admin/forms/forms.types'
import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    selector: '[checkbox-display]',
    template: `
        <div class="tooltip" attr.data-tip="{{ field.label }}">
            @if (content) {
                <div
                    class="rounded-xl border border-success/20 bg-success/10 px-2 py-1 text-center text-sm font-semibold text-success-content">
                    Oui
                </div>
            } @else {
                <div
                    class="rounded-xl border border-error/20 bg-error/10 px-2 py-1 text-center text-sm font-semibold text-error-content">
                    Non
                </div>
            }
        </div>
    `,
})
export class CheckBoxtDisplayComponent {
    @Input() content!: boolean
    @Input() field!: FormField
}
