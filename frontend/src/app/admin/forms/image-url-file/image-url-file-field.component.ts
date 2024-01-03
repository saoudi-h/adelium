/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FileUploadService } from '@core/services/file-upload.service'
import { FieldStatusComponent } from '@shared/components/form/field-status.component'
import { FormField } from '../forms.types'
import { ImageFileFieldComponent } from '../image-file/image-file-field.component'
import { ImageUrlFieldComponent } from '../image-url/image-url-field.component'

@Component({
    selector: '[image-url-file-field]',
    standalone: true,
    imports: [
        CommonModule,
        ImageUrlFieldComponent,
        ImageFileFieldComponent,
        ReactiveFormsModule,
        FieldStatusComponent,
    ],
    template: `
        <div class="flex flex-col gap-2">
            <h4 class="text-xl font-bold text-secondary">{{ field.label }}</h4>
            <div role="tablist" class="tabs tabs-bordered">
                <button
                    role="tab"
                    class="tab"
                    [ngClass]="{ 'tab-active': !isFile }"
                    (click)="isFile && setIsFile(false)">
                    Url
                </button>
                <button
                    role="tab"
                    class="tab"
                    [ngClass]="{ 'tab-active': isFile }"
                    (click)="isFile || setIsFile(true)">
                    Fichier
                </button>
            </div>
            @if (isFile) {
                <div
                    image-file-field
                    [group]="group"
                    [field]="field"
                    [noLabel]="true"></div>
            } @else {
                <div
                    image-url-field
                    [group]="group"
                    [field]="field"
                    [noLabel]="true"></div>
            }
        </div>
    `,
})
export class ImageUrlFileFieldComponent {
    isFile: boolean = false
    setIsFile(isFile: boolean): void {
        this.isFile = isFile
        this.group.get(this.field.id)?.reset()
    }
    @Input() group!: FormGroup
    @Input() field!: FormField
    externalUrl: string = ''

    getControl(fieldName: string): FormControl {
        return this.group.get(fieldName) as FormControl
    }

    constructor(private fileUploadService: FileUploadService) {}
}
