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
import { AdminConfig } from './admin-config.types'
import { ViewLayoutComponent } from './view-layout.component'

@Component({
    selector: '[base-admin-layout]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent],
    standalone: true,
    template: `<section
        view-layout
        (add)="onAdd()"
        [config]="config"
        [paginationResult$]="paginationResult$"
        (pageChange)="onPageChange($event)">
        <!-- tbody -->
        <!-- <tbody
            user-admin-tbody
            [entities$]="entities$"
            [isLoading$]="isLoading$"
            [error$]="errors$"></tbody> -->
        // TODO : add base tbody component
    </section>`,
    styles: [
        `
            :host
                max-width: 100vw
                width: 100%
                flex-grow: 1
        `,
    ],
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
        private store: Store<AppState>,
        private modalService: ModalService,
        private formModalService: FormModalService<T>
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
        console.log('handleAdd base-admin')
        this.formModalService.openFormModal(this.entityFormModel)
    }
}
