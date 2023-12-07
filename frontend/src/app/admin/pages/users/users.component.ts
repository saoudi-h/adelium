import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { User } from '@core/entity/user.entity'
import { ModalService } from '@core/services/modal.service'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import { SharedModule } from '@shared/shared.module'
import { Pagination } from '@store/pagination/pagination.reducer'
import * as PaginationSelectors from '@store/pagination/pagination.selectors'
import { UserActions } from '@store/user/user.actions'
import { UserSelectors } from '@store/user/user.selectors'
import { Observable } from 'rxjs'
@Component({
    standalone: true,
    selector: '[admin-users]',
    imports: [CommonModule, SharedModule],
    templateUrl: 'users.component.html',
    styleUrl: 'users.component.sass',
})
export class AdminUsersComponent {
    hover: boolean = false
    users$!: Observable<User[]>
    pagination$!: Observable<Pagination>
    isLoading$!: Observable<boolean>
    error$!: Observable<string | null>
    title = 'Utilisateurs'
    name = 'user'
    tableLabels = [
        'Utilisateur',
        'Addresse',
        'Autorisations',
        'Status',
        'Securité',
        'Autres',
        'Actions',
    ]
    subtitle = 'Ajouter, modifier et supprimer des utilisateurs'

    constructor(
        private store: Store<AppState>,
        private modalService: ModalService
    ) {}

    ngOnInit() {
        this.store.dispatch(UserActions.getItems())
        this.users$ = this.store.select(UserSelectors.selectAll)
        this.pagination$ = this.store.select(
            PaginationSelectors.selectPaginationInfo
        )
        this.isLoading$ = this.store.select(UserSelectors.selectIsLoading)
        this.error$ = this.store.select(UserSelectors.selectError)
    }

    onDeleteUser(id: number) {
        console.log('onDeleteUser')
        // Dispatcher l'action de suppression
        this.modalService.openModal({
            type: 'confirmation',
            title: 'Confirmation nécessaire',
            message: 'Êtes-vous sûr de vouloir continuer ?',
            isClosable: true,
            onConfirm: () =>
                this.store.dispatch(UserActions.deleteItem({ id })),
        })
    }
}
