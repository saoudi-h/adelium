import { CheckBoxFieldComponent } from '@admin/forms/checkbox/checkbox-field.component'
import { DynamicSelectFieldComponent } from '@admin/forms/dynamic-select/dynamic-select-field.component'
import { FormField } from '@admin/forms/forms.types'
import { ImageFileFieldComponent } from '@admin/forms/image-file/image-file-field.component'
import { ImageUrlFileFieldComponent } from '@admin/forms/image-url-file/image-url-file-field.component'
import { ImageUrlFieldComponent } from '@admin/forms/image-url/image-url-field.component'
import { InputFieldComponent } from '@admin/forms/input/input-field.component'
import { SelectFieldComponent } from '@admin/forms/select/select-field.component'
import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { AbstractControl, FormControl, FormGroup } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'

@Component({
    standalone: true,
    selector: '[form-fields]',
    imports: [
        CommonModule,
        SharedModule,
        InputFieldComponent,
        CheckBoxFieldComponent,
        SelectFieldComponent,
        DynamicSelectFieldComponent,
        ImageUrlFieldComponent,
        ImageFileFieldComponent,
        ImageUrlFileFieldComponent,
    ],
    template: `
        @for (field of fields; track field.id) {
            <div class="form-control w-full max-w-xs px-4 py-2">
                @switch (field.type.name) {
                    @case ('input') {
                        <div input-field [field]="field" [group]="group"></div>
                    }
                    @case ('checkbox') {
                        <div
                            checkbox-field
                            [field]="field"
                            [group]="group"></div>
                    }
                    @case ('entity') {
                        <div>
                            <div class="label">
                                <h4 class="text-xl font-bold text-secondary">
                                    {{ field.label }}
                                </h4>
                            </div>
                            <div
                                *ngIf="field.fields"
                                form-fields
                                [fields]="field.fields"
                                [group]="
                                    asFormGroup(group.get(field.id))
                                "></div>
                        </div>
                    }
                    @case ('dynamic-select') {
                        <div
                            dynamic-select-field
                            [field]="field"
                            [group]="group"
                            [entityId]="id ?? undefined"></div>
                    }
                    @case ('image') {
                        @switch (field.type.option) {
                            @case ('url') {
                                <div
                                    image-url-field
                                    [field]="field"
                                    [group]="group"></div>
                            }
                            @case ('file') {
                                <div
                                    image-file-field
                                    [field]="field"
                                    [group]="group"></div>
                            }
                            @case ('url-file') {
                                <div
                                    image-url-file-field
                                    [field]="field"
                                    [group]="group"></div>
                            }
                            @default {
                                <div>Unknown image subtype</div>
                            }
                        }
                    }
                    <!-- 
                @case ('select') {
                    <div
                        select-field
                        class="form-control w-full max-w-xs"
                        [field]="field"
                        [initialValue]="initialValue?.[field.id]"></div>
                }
        
                @case ('date') {
                    <div
                        select-field
                        [field]="field"
                        [formControlName]="field.id"
                        [initialValue]="initialValue?.[field.id]"></div>
                }
                @case ('datetime') {
                    <div
                        select-field
                        [field]="field"
                        [initialValue]="initialValue?.[field.id]"></div>
                }
                @case ('time') {
                    <div
                        select-field
                        [field]="field"
                        [initialValue]="initialValue?.[field.id]"></div>
                }
                @case ('file') {
                    <div
                        select-field
                        [field]="field"
                        [initialValue]="initialValue?.[field.id]"></div>
                }
                @case ('image') {
                    <div
                        select-field
                        [field]="field"
                        [initialValue]="initialValue?.[field.id]"></div>
                } -->
                    @default {
                        <div>Unknown field type</div>
                    }
                }
            </div>
        }
    `,
})
export class FormFieldsComponent {
    @Input() group!: FormGroup
    @Input() fields!: FormField[]
    @Input() id!: number | undefined

    isFormControl(control: AbstractControl | null): control is FormControl {
        return control instanceof FormControl
    }

    asFormGroup(control: AbstractControl | null): FormGroup {
        return control as FormGroup
    }
}
