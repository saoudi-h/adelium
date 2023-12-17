import { EntityFormModel } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { FormModalService } from '@core/services/formModal.service'
import { ModalService } from '@core/services/modal.service'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import { SharedModule } from '@shared/shared.module'
import { EntityActions } from '@store/generic/generic.actions'
import { PaginationResult } from '@store/generic/generic.reducer'
import { EntitySelectors } from '@store/generic/generic.selectors'
import { Observable, catchError, first, map, of } from 'rxjs'
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
export class BaseAdminComponent<T extends Identifiable> implements OnInit {
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
    ngOnInit(): void {
        this.store.dispatch(
            this.actions.getPage({ params: { page: 0, size: 10, sort: [] } })
        )
        this.paginationResult$ = this.store.select(
            this.selectors.selectPaginationResult
        )
        this.entities$ = this.store.select(this.selectors.selectAll)
        this.isLoading$ = this.store.select(this.selectors.selectIsLoading)
        this.error$ = this.store.select(this.selectors.selectError)
    }

    onDelete(id: number) {
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
        // Dispatcher l'action de suppression
        this.modalService.openModal({
            type: 'confirmation',
            title: 'Confirmation nécessaire',
            message: 'Êtes-vous sûr de vouloir continuer ?',
            isClosable: true,
            onConfirm: () =>
                this.store.dispatch(this.actions.deleteItem({ id })),
        })
    }

    onEdit(id: number) {
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
    }

    onPageChange(page: number) {
        console.log('onPageChange base-admin', page)
        console.log(page)
        this.store.dispatch(
            this.actions.getPage({
                params: { page: page, size: 10, sort: [] },
            })
        )
    }

    onAdd() {
        this.formModalService.openFormModal(this.entityFormModel)
    }
}
