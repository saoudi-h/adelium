/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FormField } from '../../forms.types'

@Component({
    standalone: true,
    imports: [ReactiveFormsModule],
    selector: '[checkbox-field]',
    template: ` <label
        class="form-control mb-4 w-full max-w-xs flex-row items-center gap-3"
        [formGroup]="group">
        <input
            [id]="field.id"
            type="checkbox"
            class="checkbox checkbox-xs"
            [formControlName]="field.id" />
        <div class="label">
            <span class="label-text" [attr.for]="field.id">{{
                field.label
            }}</span>
        </div>
    </label>`,
})
export class CheckBoxFieldComponent {
    getControl(fildName: string): FormControl {
        return this.group.get(fildName) as FormControl
    }
    @Input() group!: FormGroup
    @Input() field!: FormField
}
