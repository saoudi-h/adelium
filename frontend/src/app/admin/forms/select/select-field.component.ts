/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, ViewEncapsulation } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormFieldConfig } from '../forms.types'

@Component({
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgSelectModule, FormsModule],
    selector: '[select-field]',
    styleUrl: './select-field.component.sass',
    templateUrl: './select-field.component.html',
})
export class SelectFieldComponent {
    selected: any
    @Input() field!: FormFieldConfig
    @Input() initialValue?: any
}
