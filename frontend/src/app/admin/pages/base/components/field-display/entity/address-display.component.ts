import { Component, Input } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'

@Component({
    selector: '[address-display]',
    standalone: true,
    template: `<div class="flex flex-col">
        <div>
            {{ content['streetNumber'] + ' ' + content['street'] }}
        </div>

        @if (content['additionalInfo']) {
            <div>
                {{ content['additionalInfo'] }}
            </div>
        }
        <div>
            {{ content['postalCode'] + ' ' + content['city'] }}
        </div>
        <div>
            {{ content['country'] }}
        </div>
    </div>`,
})
export class AddressDisplayComponent {
    @Input() content!: Identifiable
}
