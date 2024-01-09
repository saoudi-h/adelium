import { OnDestroy, OnInit } from '@angular/core'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common'
import { Component, Input, ViewEncapsulation } from '@angular/core'
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { FieldStatusComponent } from '@shared/components/form/field-status.component'
import {
    PaginationParams,
    PaginationResult,
} from '@store/generic/generic.reducer'
import { Observable, Subscription, tap } from 'rxjs'
import { FormField } from '../../forms.types'

type itemsType = {
    label: string
    value: any
    disabled?: boolean
}
@Component({
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        FieldStatusComponent,
    ],
    selector: '[dynamic-select-field]',
    styleUrl: './dynamic-select-field.component.sass',
    templateUrl: './dynamic-select-field.component.html',
})
export class DynamicSelectFieldComponent implements OnInit, OnDestroy {
    @Input() group!: FormGroup
    subscription = new Subscription()
    itemsBuffer: itemsType[] = []
    items$!: Observable<itemsType[]> | undefined
    paginationResult$!: Observable<PaginationResult> | undefined
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

    @Input() field!: FormField
    @Input() entityId?: number

    ngOnInit(): void {
        if (this.field.dynamicOptions) {
            this.initializeItemsStream()
            this.initializePagination()
            this.loadInitialValuesIfNeeded()
        }
    }

    private initializeItemsStream(): void {
        this.items$ = this.field.dynamicOptions!.all()
        this.paginationResult$ = this.field.dynamicOptions!.paginationResult()

        this.subscription.add(
            this.paginationResult$
                .pipe(
                    tap(paginationResult => {
                        this.loading = false
                        this.allDataLoaded =
                            paginationResult.number >=
                            paginationResult.totalPages - 1
                    })
                )
                .subscribe()
        )
    }

    private initializePagination(): void {
        this.getNextPage = this.field.dynamicOptions!.getNextPage
        this.getNextPage(this.paginationParams)
    }

    private loadInitialValuesIfNeeded(): void {
        if (this.entityId) {
            if (this.field.dynamicOptions!.getInitialsById) {
                this.subscription.add(
                    this.field
                        .dynamicOptions!.getInitialsById(this.entityId)
                        .subscribe(initialValues => {
                            this.group.patchValue({
                                [this.field.id]: initialValues,
                            })
                        })
                )
            } else if (this.field.dynamicOptions!.getInitialById) {
                this.subscription.add(
                    this.field
                        .dynamicOptions!.getInitialById(this.entityId)
                        .subscribe(initialValue => {
                            this.group.patchValue({
                                [this.field.id]: initialValue,
                            })
                        })
                )
            } else {
                if (this.field.dynamicOptions!.getInitialByRelatedId) {
                    this.subscription.add(
                        this.field
                            .dynamicOptions!.getInitialByRelatedId(
                                this.group.get(this.field.id)?.value
                            )
                            .subscribe(initialValue => {
                                this.group.patchValue({
                                    [this.field.id]: initialValue,
                                })
                            })
                    )
                }
            }
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
        if (this.loading || this.allDataLoaded) {
            return
        }

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
    getControl(fildName: string): FormControl {
        return this.group.get(fildName) as FormControl
    }
}
