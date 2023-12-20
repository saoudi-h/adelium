import { CheckBoxFieldComponent } from '@admin/forms/checkbox/checkbox-field.component'
import { DynamicSelectFieldComponent } from '@admin/forms/dynamic-select/dynamic-select-field.component'
import { FormField } from '@admin/forms/forms.types'
import { InputFieldComponent } from '@admin/forms/input/input-field.component'
import { SelectFieldComponent } from '@admin/forms/select/select-field.component'
import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { SharedModule } from '@shared/shared.module'

@Component({
    standalone: true,
    selector: '[form-field]',
    imports: [
        CommonModule,
        SharedModule,
        InputFieldComponent,
        CheckBoxFieldComponent,
        SelectFieldComponent,
        DynamicSelectFieldComponent,
    ],
    template: `@for (field of fields; track field) {
        @if (field.type.name === 'input') {
            <div
                input-field
                class="form-control w-full max-w-xs"
                [field]="field"
                [initialValue]="initialValue?.[field.id]"></div>
        } @else if (field.type.name === 'select') {
            <div
                select-field
                class="form-control w-full max-w-xs"
                [field]="field"
                [initialValue]="initialValue?.[field.id]"></div>
        } @else if (field.type.name === 'dynamic-select') {
            <div
                dynamic-select-field
                class="form-control w-full max-w-xs"
                [field]="field"
                [entityId]="initialValue?.id"></div>
        } @else if (field.type.name === 'checkbox') {
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text" [attr.for]="field.id">{{
                        field.label
                    }}</span>
                </div>
                <input
                    [id]="field.id"
                    type="checkbox"
                    [checked]="
                        initialValue?.[field.id]
                            ? initialValue?.[field.id]
                            : false
                    "
                    class="checkbox-primary checkbox" />
            </label>
        } @else if (field.type.name === 'entity' && field.fields) {
            <div class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text" [attr.for]="field.id">{{
                        field.label
                    }}</span>
                </div>
                <div
                    form-field
                    [fields]="field.fields"
                    [initialValue]="initialValue?.[field.id]"></div>
            </div>
        }
    }`,
})
export class FormFieldComponent<T extends Identifiable> {
    @Input() fields!: FormField[]
    @Input() initialValue!: T | undefined
    constructor() {}
}
