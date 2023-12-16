/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core'
import { FormField } from '../forms.types'

@Component({
    standalone: true,
    selector: '[checkbox-field]',
    template: ` <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text" [attr.for]="field.id">{{
                field.label
            }}</span>
        </div>
        <input
            [id]="field.id"
            type="checkbox"
            [checked]="
                initialValue?.[field.id] ? initialValue?.[field.id] : false
            "
            class="checkbox-primary checkbox" />
    </label>`,
})
export class CheckBoxFieldComponent {
    @Input() field!: FormField
    @Input() initialValue?: any
}
