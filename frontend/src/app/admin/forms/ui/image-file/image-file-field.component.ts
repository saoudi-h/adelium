/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, ViewChild } from '@angular/core'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { FieldStatusComponent } from '@shared/components/form/field-status.component'
import { ImageIconComponent } from '@shared/components/icons/image-icon.component'
import { FormField } from '../../forms.types'

@Component({
    selector: '[image-file-field]',
    imports: [ReactiveFormsModule, FieldStatusComponent, ImageIconComponent],
    standalone: true,
    template: `
        <div field-status [control]="getControl(field.id)">
            <div class="group relative z-0 w-full" [formGroup]="group">
                <div class="group relative z-0 w-full">
                    <input
                        #fileInput
                        hidden
                        type="file"
                        (change)="onFileChange($event)"
                        placeholder=""
                        [name]="field.id"
                        [formControlName]="field.id" />
                    <div class="flex h-10 flex-row items-center text-sm">
                        <button
                            id="file-upload-btn"
                            attr.data-tip="{{ fileName }}"
                            class="btn btn-ghost btn-sm tooltip flex w-full flex-row flex-nowrap gap-4"
                            (click)="inputClick()">
                            <div image-icon className="h-4 w-4"></div>
                            <div
                                id="file-upload-name"
                                class="max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
                                {{ fileName }}
                            </div>
                        </button>
                    </div>
                    @if (!noLabel) {
                        <label
                            [for]="field.id"
                            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-base-content/50 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-accent"
                            >{{ field.label }}</label
                        >
                    }
                </div>
            </div>
        </div>
    `,
})
export class ImageFileFieldComponent {
    @ViewChild('fileInput') fileInput!: any
    fileName: string = 'Aucun fichier sélectionné'
    @Input() group!: FormGroup
    @Input() field!: FormField
    @Input() noLabel: boolean = false

    inputClick(): void {
        this.fileInput.nativeElement.click()
    }
    onFileChange(event: any): void {
        const file = event.target.files[0]
        this.field.inputFile = {
            ...this.field.inputFile,
            type: file.type.option === 'file' ? 'file' : 'url-file',
            file,
        }
        this.fileName = file.name
    }

    getControl(fieldName: string): FormControl {
        return this.group.get(fieldName) as FormControl
    }

    isRequired(): boolean {
        return this.field.validators?.includes(Validators.required) ?? false
    }
}
