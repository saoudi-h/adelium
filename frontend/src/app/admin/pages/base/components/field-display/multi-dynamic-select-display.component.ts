/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: '[multi-dynamic-select-display]',
    template: `
        <div>
            @for (element of content$ | async; track element) {
                <div>{{ element }}</div>
            }
        </div>
    `,
})
export class MultiDynamicSelectDisplayComponent implements OnInit {
    @Input() id!: number
    @Input() field!: FormField
    content$!: Observable<any>

    ngOnInit() {
        if (!this.field?.dynamicOptions?.display) return
        this.content$ = this.field!.dynamicOptions!.display(this.id)
    }
}
