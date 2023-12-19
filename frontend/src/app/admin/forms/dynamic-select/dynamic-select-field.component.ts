import { OnDestroy, OnInit } from '@angular/core'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common'
import { Component, Input, ViewEncapsulation } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { PaginationParams } from '@store/generic/generic.reducer'
import { Observable, Subscription } from 'rxjs'
import { FormField } from '../forms.types'

@Component({
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CommonModule, NgSelectModule, FormsModule],
    selector: '[dynamic-select-field]',
    styleUrl: './dynamic-select-field.component.sass',
    templateUrl: './dynamic-select-field.component.html',
})
export class DynamicSelectFieldComponent implements OnInit, OnDestroy {
    subscription = new Subscription()
    itemsBuffer: {
        label: string
        value: any
        disabled?: boolean | undefined
    }[] = []
    loading: boolean = false
    allDataLoaded: boolean = false
    paginationParams: PaginationParams = {
        page: 0,
        size: 5,
        sort: [],
    }
    getNextPage!: (params: PaginationParams) => void
    initialRelatedValue?:
        | Observable<
              { label: string; value: any; disabled?: boolean | undefined }[]
          >
        | undefined
    numberOfItemsFromEndBeforeFetchingMore = 2

    items$!: Observable<
        { label: string; value: any; disabled?: boolean | undefined }[]
    >
    selected!: { label: string; value: any; disabled?: boolean | undefined }[]
    @Input() field!: FormField
    @Input() entityId?: number

    ngOnInit(): void {
        if (this.field.dynamicOptions) {
            this.subscription.add(
                this.field.dynamicOptions.all().subscribe(items => {
                    this.itemsBuffer = [
                        ...this.itemsBuffer,
                        ...items.map(item => ({
                            label: item.label,
                            value: item.value,
                        })),
                    ]
                    this.loading = false
                })
            )

            this.subscription.add(
                this.field.dynamicOptions
                    .paginationResult()
                    .subscribe(result => {
                        console.log(result)
                        if (
                            this.itemsBuffer.length > 0 &&
                            result.number >= result.totalPages - 1
                        ) {
                            this.allDataLoaded = true
                        }
                    })
            )
            if (this.entityId && this.field.dynamicOptions.getInitialById) {
                console.log('entityId', this.entityId)
                this.subscription.add(
                    this.field.dynamicOptions
                        .getInitialById(this.entityId)
                        .subscribe(initialValues => {
                            console.log('init', initialValues)
                            this.itemsBuffer = [
                                ...this.itemsBuffer,
                                ...initialValues.map(item => ({
                                    label: item.label,
                                    value: item.value,
                                })),
                            ]
                            console.log('initial values ', this.itemsBuffer)
                            console.log('selected', this.selected)
                            this.selected = initialValues
                        })
                )
            }

            this.getNextPage = this.field.dynamicOptions.getNextPage

            this.getNextPage(this.paginationParams)
            // if (this.initialValue && this.field.dynamicOptions.getInitialById) {
            //     this.initialRelatedValue =
            //         this.field.dynamicOptions.getInitialById(
            //             this.initialValue.id
            //         )
            // }
        }
    }

    onScroll({ end }: { start: number; end: number }): void {
        if (this.loading) {
            return
        }
        const distanceFromEnd = this.itemsBuffer.length - end
        if (distanceFromEnd <= this.numberOfItemsFromEndBeforeFetchingMore) {
            this.fetchMore()
        }
    }
    onScrollToEnd(): void {
        this.fetchMore()
    }

    fetchMore(): void {
        if (this.loading || this.allDataLoaded) return

        this.loading = true

        this.paginationParams = {
            ...this.paginationParams,
            page: this.paginationParams.page + 1,
        }

        this.getNextPage(this.paginationParams)
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
