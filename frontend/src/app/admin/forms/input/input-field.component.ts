/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core'
import { FormField } from '../forms.types'

@Component({
    standalone: true,
    selector: '[input-field]',
    template: `
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text" [attr.for]="field.id">{{
                    field.label
                }}</span>
            </div>
            <input
                class="input input-bordered w-full max-w-xs"
                [id]="field.id"
                [type]="field.type.option"
                [placeholder]="
                    field.placeholder ? field.placeholder : field.label
                "
                [value]="initialValue ? initialValue : ''"
                class="input input-bordered" />
        </label>
    `,
})
export class InputFieldComponent {
    @Input() field!: FormField
    @Input() initialValue?: any
}
