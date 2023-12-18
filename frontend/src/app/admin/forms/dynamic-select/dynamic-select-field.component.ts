import { OnInit } from '@angular/core'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common'
import { Component, Input, ViewEncapsulation } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Identifiable } from '@core/entity/identifiable.interface'
import { NgSelectModule } from '@ng-select/ng-select'
import { Observable } from 'rxjs'
import { FormField } from '../forms.types'

@Component({
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CommonModule, NgSelectModule, FormsModule],
    selector: '[dynamic-select-field]',
    styleUrl: './dynamic-select-field.component.sass',
    templateUrl: './dynamic-select-field.component.html',
})
export class DynamicSelectFieldComponent implements OnInit {
    @Input() fetchMoreEntities!: () => void
    loading: boolean = false
    numberOfItemsFromEndBeforeFetchingMore = 10

    items$!: Observable<
        { label: string; value: any; disabled?: boolean | undefined }[]
    >
    selected!: { label: string; value: any; disabled?: boolean | undefined }[]
    @Input() field!: FormField
    @Input() initialValue?: Identifiable | Identifiable[]

    ngOnInit(): void {
        if (this.field.dynamicOptions) {
            this.items$ = this.field.dynamicOptions.all()
        }
        // if (this.initialValue) {
        //     if (Array.isArray(this.initialValue)) {
        //         this.selected = this.initialValue.map((item: Identifiable) => ({
        //             label: item.toString(),
        //             value: item.id,
        //             disabled: false,
        //         }))
        //     } else {
        //         this.selected = [
        //             {
        //                 label: this.initialValue.toString(),
        //                 value: this.initialValue.id,
        //                 disabled: false,
        //             },
        //         ]
        //     }
        // }
    }

    onScroll({ end }: { start: number; end: number }): void {
        if (this.loading || !this.fetchMore) {
            return
        }
        if (end && this.fetchMore) {
            this.fetchMore()
        }
    }
    onScrollToEnd(): void {
        this.fetchMore()
    }

    fetchMore(): void {
        this.loading = true
        this.fetchMoreEntities()
        this.loading = false
    }
}
