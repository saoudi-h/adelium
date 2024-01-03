/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: '[dynamic-select-display]',
    template: `
        <div>
            <div>{{ content$ | async }}</div>
        </div>
    `,
})
export class DynamicSelectDisplayComponent implements OnInit {
    @Input() content!: number
    @Input() field!: FormField
    content$!: Observable<any>

    ngOnInit() {
        if (!this.field?.dynamicOptions?.display) return
        this.content$ = this.field?.dynamicOptions?.display(this.content)
    }
}
