/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { AddressDisplayComponent } from './entity/address-display.component'
import { MediaBooleanDisplayComponent } from './entity/media-boolean-display.component'
import { MediaTextDisplayComponent } from './entity/media-text-display.component'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        AddressDisplayComponent,
        MediaBooleanDisplayComponent,
        MediaTextDisplayComponent,
    ],
    selector: '[entity-display]',
    template: `<div class="tooltip" attr.data-tip="{{ field.label }}">
        @if (field.type.option) {
            @switch (field.type.option) {
                @case ('address') {
                    <div address-display [content]="content"></div>
                }
                @case ('media-boolean') {
                    <div media-boolean-display [content]="content"></div>
                }
                @case ('media-text') {
                    <div media-text-display [content]="content"></div>
                }
                @default {
                    <div>{{ field.type.option }}</div>
                }
            }
        }
    </div>`,
})
export class EntityDisplayComponent {
    @Input() content!: Identifiable
    @Input() field!: FormField
}
