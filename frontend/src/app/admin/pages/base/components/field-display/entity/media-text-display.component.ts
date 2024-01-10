import { Component, Input } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'

@Component({
    selector: '[media-text-display]',
    standalone: true,
    template: `<div class="flex flex-col">
        {{ content['content'] }}
    </div>`,
})
export class MediaTextDisplayComponent {
    @Input() content!: Identifiable
}
