import { EntityFormModel } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { FormModalService } from '@core/services/formModal.service'
import { ModalService } from '@core/services/modal.service'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import { SharedModule } from '@shared/shared.module'
import { EntityActions } from '@store/generic/generic.actions'
import {
    PaginationParams,
    PaginationResult,
} from '@store/generic/generic.reducer'
import { EntitySelectors } from '@store/generic/generic.selectors'
import { Observable, Subscription, catchError, first, map, of, tap } from 'rxjs'
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

    constructor(
        protected store: Store<AppState>,
        protected modalService: ModalService,
        protected formModalService: FormModalService<T>
    ) {}
    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
    ngOnInit(): void {
        this.paginationParams$ = this.store.select(
            this.selectors.selectPaginationParams
        )

        this.subscription.add(
            this.paginationParams$
                .pipe(
                    tap(params => {
                        this.store.dispatch(this.actions.getPage({ params }))
                    })
                )
                .subscribe()
        )

        this.paginationResult$ = this.store.select(
            this.selectors.selectPaginationResult
        )
        this.entities$ = this.store.select(this.selectors.selectCurrentPage)
        this.isLoading$ = this.store.select(this.selectors.selectIsLoading)
        this.error$ = this.store.select(this.selectors.selectError)
    }

    onDelete(id: number) {
        // Dispatcher l'action de suppression
        this.modalService.openModal({
            type: 'confirmation',
            title: 'Confirmation nécessaire',
            message: 'Êtes-vous sûr de vouloir continuer ?',
            isClosable: true,
            onConfirm: () => {
                setTimeout(() => {
                    this.store.dispatch(this.actions.deleteItem({ id })), 500
                })
                this.entities$ = this.entities$.pipe(
                    map(entities =>
                        entities.map(entity => {
                            if (entity.id === id) {
                                return { ...entity, isDeleting: true }
                            }
                            return entity
                        })
                    )
                )
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
                    })
                })
        )
    }

    onPageChange(page: number) {
        this.store.dispatch(this.actions.updatePaginationParams({ page }))
    }

    onAdd() {
        this.formModalService.openFormModal(this.entityFormModel)
    }
}
