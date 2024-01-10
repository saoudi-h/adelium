import { FormField } from '@admin/forms/forms.types'
import { CheckBoxFieldComponent } from '@admin/forms/ui/checkbox/checkbox-field.component'
import { DynamicSelectFieldComponent } from '@admin/forms/ui/dynamic-select/dynamic-select-field.component'
import { ImageFileFieldComponent } from '@admin/forms/ui/image-file/image-file-field.component'
import { ImageUrlFileFieldComponent } from '@admin/forms/ui/image-url-file/image-url-file-field.component'
import { ImageUrlFieldComponent } from '@admin/forms/ui/image-url/image-url-field.component'
import { InputFieldComponent } from '@admin/forms/ui/input/input-field.component'
import { InputHiddenFieldComponent } from '@admin/forms/ui/input/input-hidden-field.component'
import { SelectFieldComponent } from '@admin/forms/ui/select/select-field.component'
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
        InputHiddenFieldComponent,
        CheckBoxFieldComponent,
        SelectFieldComponent,
        DynamicSelectFieldComponent,
        ImageUrlFieldComponent,
        ImageFileFieldComponent,
        ImageUrlFileFieldComponent,
    ],
    template: `
        @for (field of fields; track field.id) {
            @switch (field.type.name) {
                @case ('input') {
                    @switch (field.type.option) {
                        @case ('hidden') {
                            <div
                                input-hidden-field
                                [field]="field"
                                [group]="group"
                                class="invisible absolute"></div>
                        }

                        @default {
                            <div
                                input-field
                                [field]="field"
                                [class]="className"
                                [group]="group"></div>
                        }
                    }
                }
                @case ('checkbox') {
                    <div
                        checkbox-field
                        [field]="field"
                        [group]="group"
                        [class]="className"></div>
                }
                @case ('entity') {
                    <div [class]="className">
                        <div class="label">
                            <h4 class="text-xl font-bold text-secondary">
                                {{ field.label }}
                            </h4>
                        </div>
                        <div
                            *ngIf="field.fields"
                            form-fields
                            [fields]="field.fields"
                            [group]="asFormGroup(group.get(field.id))"></div>
                    </div>
                }
                @case ('dynamic-select') {
                    <div
                        dynamic-select-field
                        [field]="field"
                        [group]="group"
                        [class]="className"
                        [entityId]="id ?? undefined"></div>
                }
                @case ('image') {
                    @switch (field.type.option) {
                        @case ('url') {
                            <div
                                image-url-field
                                [field]="field"
                                [group]="group"
                                [class]="className"></div>
                        }
                        @case ('file') {
                            <div
                                image-file-field
                                [field]="field"
                                [group]="group"
                                [class]="className"></div>
                        }
                        @case ('url-file') {
                            <div
                                image-url-file-field
                                [field]="field"
                                [group]="group"
                                [class]="className"></div>
                        }
                        @default {
                            <div [class]="className">Unknown image subtype</div>
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
        }
    `,
})
export class FormFieldsComponent {
    @Input() group!: FormGroup
    @Input() fields!: FormField[]
    @Input() id!: number | undefined
    className = 'form-control w-full max-w-sm px-4 py-2'

    isFormControl(control: AbstractControl | null): control is FormControl {
        return control instanceof FormControl
    }

    asFormGroup(control: AbstractControl | null): FormGroup {
        return control as FormGroup
    }
}
