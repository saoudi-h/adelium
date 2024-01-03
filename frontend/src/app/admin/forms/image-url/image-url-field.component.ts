/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { FieldStatusComponent } from '@shared/components/form/field-status.component'
import { FormField } from '../forms.types'

@Component({
    selector: '[image-url-field]',
    imports: [ReactiveFormsModule, FieldStatusComponent],
    standalone: true,
    template: `
        <div field-status [control]="getControl(field.id)">
            <div class="group relative z-0 w-full" [formGroup]="group">
                <input
                    (change)="onUrlChange()"
                    [id]="field.id"
                    type="url"
                    placeholder=""
                    [name]="field.id"
                    class="peer block w-full appearance-none border-0 border-b-2 border-base-200 bg-transparent px-0 py-2.5 text-sm text-base-content/70 focus:border-accent focus:outline-none focus:ring-0"
                    [formControlName]="field.id"
                    [required]="isRequired()" />
                @if (!noLabel) {
                    <label
                        [for]="field.id"
                        class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-base-content/50 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-accent"
                        >{{ field.label }}</label
                    >
                }
            </div>
        </div>
    `,
})
export class ImageUrlFieldComponent {
    @Input() noLabel: boolean = false
    getControl(fieldName: string): FormControl {
        return this.group.get(fieldName) as FormControl
    }

    @Input() group!: FormGroup
    @Input() field!: FormField

    onUrlChange(): void {
        this.field.inputFile = {
            ...this.field.inputFile,
            type: this.field.type.option === 'url' ? 'url' : 'url-file',
            file: undefined,
        }
    }

    isRequired(): boolean {
        return this.field.validators?.includes(Validators.required) ?? false
    }
}
