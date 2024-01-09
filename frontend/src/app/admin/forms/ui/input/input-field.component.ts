/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { FieldStatusComponent } from '@shared/components/form/field-status.component'
import { FormField } from '../../forms.types'

@Component({
    standalone: true,
    selector: '[input-field]',
    imports: [ReactiveFormsModule, FieldStatusComponent],
    template: `
        <div field-status [control]="getControl(field.id)">
            <div class="group relative z-0 w-full" [formGroup]="group">
                <input
                    [id]="field.id"
                    [type]="field.type.option"
                    placeholder=""
                    [name]="field.id"
                    class="peer block w-full appearance-none border-0 border-b-2 border-base-200 bg-transparent px-0 py-2.5 text-sm text-base-content/70 focus:border-accent focus:outline-none focus:ring-0"
                    [formControlName]="field.id"
                    [required]="isRequired()" />
                <label
                    [for]="field.id"
                    class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-base-content/50 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-accent"
                    >{{ field.label }}</label
                >
            </div>
        </div>
    `,
})
export class InputFieldComponent {
    getControl(fildName: string): FormControl {
        return this.group.get(fildName) as FormControl
    }
    @Input() group!: FormGroup
    @Input() field!: FormField

    isRequired(): boolean {
        return this.field.validators?.includes(Validators.required) ?? false
    }
}
