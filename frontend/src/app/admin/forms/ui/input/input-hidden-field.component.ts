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
    selector: '[input-hidden-field]',
    imports: [ReactiveFormsModule, FieldStatusComponent],
    template: `
        <div class="" [formGroup]="group">
            <input
                [id]="field.id"
                [type]="'hidden'"
                placeholder=""
                [name]="field.id"
                class="h-0 w-0 opacity-0"
                [formControlName]="field.id"
                [required]="isRequired()" />
        </div>
    `,
})
export class InputHiddenFieldComponent {
    getControl(fildName: string): FormControl {
        return this.group.get(fildName) as FormControl
    }
    @Input() group!: FormGroup
    @Input() field!: FormField

    isRequired(): boolean {
        return this.field.validators?.includes(Validators.required) ?? false
    }
}
