import { Component, Input } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'

@Component({
    selector: '[media-boolean-display]',
    standalone: true,
    template: `<div class="flex flex-col">
        @if (content['content']) {
            <div
                class="rounded-xl border border-success/20 bg-success/10 px-2 py-1 text-center text-sm font-semibold text-success-content">
                Vrai
            </div>
        } @else {
            <div
                class="rounded-xl border border-error/20 bg-error/10 px-2 py-1 text-center text-sm font-semibold text-error-content">
                Faux
            </div>
        }
    </div>`,
})
export class MediaBooleanDisplayComponent {
    @Input() content!: Identifiable
    constructor() {}
}
