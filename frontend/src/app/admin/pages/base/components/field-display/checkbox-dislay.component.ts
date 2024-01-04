import { FormField } from '@admin/forms/forms.types'
import { Component, Input } from '@angular/core'

@Component({
    standalone: true,
    selector: '[checkbox-display]',
    template: `
        <div>
            @if (content) {
                <div
                    class="rounded-xl border border-success bg-success/50 px-1 py-1 text-center text-sm font-semibold text-success-content">
                    Oui
                </div>
            } @else {
                <div
                    class="rounded-xl border border-error bg-error/50 px-1 py-1 text-center text-sm font-semibold text-error-content">
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
