import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { ModalService } from '@core/services/modal.service'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import { SharedModule } from '@shared/shared.module'
import { EntityActions } from '@store/generic/generic.actions'
import { PaginationResult } from '@store/generic/generic.reducer'
import { EntitySelectors } from '@store/generic/generic.selectors'
import { Observable } from 'rxjs'
import { AdminConfig } from './admin-config.types'
import { ViewLayoutComponent } from './view-layout.component'

@Component({
    selector: '[base-admin-layout]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent],
    standalone: true,
    template: `<section
        view-layout
        [config]="config"
        [paginationResult$]="paginationResult$">
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

    constructor(
        private store: Store<AppState>,
        private modalService: ModalService
    ) {}
    ngOnInit(): void {
        this.store.dispatch(
            this.actions.getPage({ params: { page: 1, size: 10, sort: [] } })
        )
        this.paginationResult$ = this.store.select(
            this.selectors.selectPaginationResult
        )
        this.entities$ = this.store.select(this.selectors.selectAll)
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
            onConfirm: () =>
                this.store.dispatch(this.actions.deleteItem({ id })),
        })
    }

    onEdit(id: number) {
        console.log('edit', id)
    }
}
