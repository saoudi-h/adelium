import { IconService } from '@core/services/icon.service'
/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { EntityFormModel } from '@admin/forms/forms.types'
import { FormModalService } from '@admin/modal/formModal.service'
import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { ModalService } from '@core/services/modal.service'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import { SharedModule } from '@shared/shared.module'
import { EntityActions } from '@store/generic/generic.actions'
import {
    PaginationParams,
    PaginationResult,
    SortCriterion,
} from '@store/generic/generic.reducer'
import { EntitySelectors } from '@store/generic/generic.selectors'
import { Observable, Subscription, catchError, first, of, tap } from 'rxjs'
import { baseAnimations } from './base-animations.animation'
import { BaseTrComponent } from './base-tr.component'
import { AdminConfig } from './components/admin-config.types'
import { ViewLayoutComponent } from './components/view-layout.component'

@Component({
    selector: '[base-layout]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: './base.component.html',
    styleUrl: './base.component.sass',
    animations: baseAnimations,
})
export class BaseAdminComponent<T extends Identifiable>
    implements OnInit, OnDestroy
{
    deleteId: number | undefined = -1
    private subscription = new Subscription()
    paginationParams$!: Observable<PaginationParams>
    selectors!: EntitySelectors<T>
    actions!: EntityActions<T>
    entities$!: Observable<T[]>
    isLoading$!: Observable<boolean>
    error$!: Observable<string | null>
    config!: AdminConfig
    paginationResult$!: Observable<PaginationResult>
    entityFormModel!: EntityFormModel<T>
    sortState: SortCriterion = {
        property: '',
        direction: 'asc',
    }

    constructor(
        protected store: Store<AppState>,
        protected modalService: ModalService,
        protected formModalService: FormModalService<T>,
        protected iconService: IconService
    ) {}
    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
    ngOnInit(): void {
        this.paginationParams$ = this.store.select(
            this.selectors.selectPaginationParams
        )

        this.getCurrentPage()

        this.paginationResult$ = this.store.select(
            this.selectors.selectPaginationResult
        )
        this.entities$ = this.store.select(this.selectors.selectCurrentPage)
        this.isLoading$ = this.store.select(this.selectors.selectIsLoading)
        this.error$ = this.store.select(this.selectors.selectError)
    }

    getCurrentPage() {
        this.subscription.add(
            this.paginationParams$
                .pipe(
                    tap(params => {
                        this.store.dispatch(this.actions.getPage({ params }))
                    })
                )
                .subscribe()
        )
    }

    onDelete(id: number) {
        this.modalService.openModal({
            type: 'confirmation',
            title: 'Confirmation nécessaire',
            message: 'Êtes-vous sûr de vouloir continuer ?',
            isClosable: true,
            onConfirm: () => {
                setTimeout(() => {
                    this.store.dispatch(this.actions.deleteItem({ id }))
                }, 500)
                this.deleteId = id
            },
        })
    }

    onEdit(id: number) {
        this.subscription.add(
            this.store
                .select(this.selectors.selectEntityById(id))
                .pipe(
                    first(),
                    catchError(error => {
                        console.log(
                            "Erreur lors de la récupération de l'entité",
                            error
                        )
                        return of(undefined)
                    })
                )
                .subscribe(entity => {
                    this.formModalService.openFormModal({
                        ...this.entityFormModel,
                        initialValue: entity,
                        actionType: 'edit',
                    })
                })
        )
    }

    editOne = (formValue: T, transactionId: string) => {
        console.log('formValue : ', formValue)
        console.log('json', JSON.stringify(formValue))
        this.store.dispatch(
            this.actions.updateItem({ item: formValue, transactionId })
        )
    }

    onPageChange(page: number) {
        this.store.dispatch(this.actions.updatePaginationParams({ page }))
    }

    onAdd() {
        this.formModalService.openFormModal({
            ...this.entityFormModel,
            onSuccess: this.refresh,
        })
    }

    addOne = (formValue: T, transactionId: string) => {
        console.log('formValue : ', formValue)
        console.log('json', JSON.stringify(formValue))
        this.store.dispatch(
            this.actions.addItem({ item: formValue, transactionId })
        )
    }
    refresh = () => {
        this.getCurrentPage()
    }
    selectTransactionStatus = (transactionId: string) => {
        return this.store.select(
            this.selectors.selectTransactionStatus(transactionId)
        )
    }

    onSortChange(property: string) {
        if (this.sortState.property === property) {
            this.sortState = {
                ...this.sortState,
                direction: this.sortState.direction === 'asc' ? 'desc' : 'asc',
            }
        } else {
            this.sortState = { property, direction: 'asc' }
        }
        const sort: SortCriterion[] = [this.sortState]
        this.store.dispatch(this.actions.resetEntities())
        this.store.dispatch(this.actions.updatePaginationParams({ sort }))
    }

    onSizeChange(size: number) {
        this.store.dispatch(this.actions.updatePaginationParams({ size }))
    }

    getIconComponent(iconName: string) {
        return this.iconService.getIconComponent(iconName)
    }
}
