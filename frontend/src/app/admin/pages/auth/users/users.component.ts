import { AddressEntityForm } from './../../../forms/Forms'
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CheckboxForm,
    EmailInput,
    MultiDynamicSelectForm,
    TelInput,
    TextInput,
    UrlInput,
} from '@admin/forms/Forms'
import { addressFormFields } from '@admin/forms/form-field/addressFormField'
import { createMultiDynamicOptions } from '@admin/forms/forms.utility'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { Role } from '@core/entity/auth/role.entity'
import { User } from '@core/entity/auth/user.entity'
import { SharedModule } from '@shared/shared.module'
import { RoleActions } from '@store/entities/auth/role/role.actions'
import { RoleSelectors } from '@store/entities/auth/role/role.selectors'
import { UserActions } from '@store/entities/auth/user/user.actions'
import { UserSelectors } from '@store/entities/auth/user/user.selectors'
import { Observable, filter, switchMap } from 'rxjs'
import { EntityFormModel } from '../../../forms/forms.types'
import { UserAdminTrComponent } from './user-admin-tr.component'

@Component({
    standalone: true,
    selector: '[admin-users]',
    imports: [
        CommonModule,
        SharedModule,
        ViewLayoutComponent,
        UserAdminTrComponent,
    ],
    animations: baseAnimations,
    template: `<section
        view-layout
        [config]="config"
        [paginationResult$]="paginationResult$"
        [paginationParams$]="paginationParams$"
        (add)="onAdd()"
        (pageChange)="onPageChange($event)"
        (sortChange)="onSortChange($event)"
        (sizeChange)="onSizeChange($event)"
        (exportAll)="exportAll()"
        [sortState]="sortState">
        @if (error$ | async; as errorMessage) {
            <div>error : {{ errorMessage }}</div>
        }
        @if (entities$ | async; as entities) {
            @if (paginationResult$ | async; as pagination) {
                <tbody [@bodyAnimation]="pagination.number">
                    @for (entity of entities; track entity) {
                        <tr
                            user-admin-tr
                            [@deleteAnimation]="
                                entity.id === deleteId ? 'deleted' : 'active'
                            "
                            (delete)="onDelete($event)"
                            (edit)="onEdit($event)"
                            [getRoles]="this.getRoles"
                            [entity]="entity"></tr>
                    }
                </tbody>
            }
        } @else {
            <div>Chargement des données...</div>
        }
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
export class AdminUsersComponent extends BaseAdminComponent<User> {
    override selectors = UserSelectors
    override actions = UserActions
    override entities$!: Observable<User[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Utilisateurs',
        name: 'utilisateur',
        plural: 'utilisateurs',
        exportable: true,
        masculin: true,
        tableLabels: [
            { label: 'Utilisateur', sortable: true, sortField: 'username' },
            { label: 'Addresse', sortable: false, sortField: 'address' },
            { label: 'Roles', sortable: false, sortField: 'roles' },
            { label: 'Status', sortable: false, sortField: 'status' },
            { label: 'Securité', sortable: false, sortField: 'security' },
            { label: 'Autres', sortable: true, sortField: 'enabled' },
        ],
        subtitle: 'Ajouter, modifier et supprimer des utilisateurs',
    }
    override entityFormModel: EntityFormModel<User> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Utilisateur',
        id: 'user',
        actions: [
            {
                label: 'Enregistrer',
                type: 'submit',
                color: 'primary',
                icon: 'save-icon',
                action: () => {
                    console.log('save')
                },
            },
        ],
        additionalInfo: 'Veuillez remplir les champs suivants',
        fields: [
            {
                id: 'firstname',
                type: TextInput,
                label: 'Prénom',
                placeholder: 'John',
                validators: [Validators.required, Validators.maxLength(50)],
            },
            {
                id: 'lastname',
                type: TextInput,
                label: 'Nom',
                placeholder: 'Doe',
                validators: [Validators.required, Validators.maxLength(50)],
            },
            {
                id: 'username',
                type: EmailInput,
                label: 'Username',
                placeholder: 'my@adelium.io',
                validators: [
                    Validators.required,
                    Validators.email,
                    Validators.maxLength(50),
                ],
            },
            {
                id: 'phone',
                type: TelInput,
                label: 'Téléphone',
                placeholder: '0606060606',
                validators: [Validators.required, Validators.maxLength(50)],
            },
            {
                id: 'roles',
                type: MultiDynamicSelectForm,
                label: 'Role',
                placeholder: 'Selectionnez les Roles',
                dynamicOptions: createMultiDynamicOptions<User, Role>(
                    this.store,
                    this.selectors,
                    this.actions,
                    RoleSelectors,
                    RoleActions,
                    'name',
                    'roles'
                ),
                validators: [Validators.required],
            },
            {
                id: 'accountNonExpired',
                type: CheckboxForm,
                label: 'Compte non expiré',
                validators: [Validators.required],
            },
            {
                id: 'accountNonLocked',
                type: CheckboxForm,
                label: 'Compte non verrouillé',
            },
            {
                id: 'credentialsNonExpired',
                type: CheckboxForm,
                label: 'Mot de passe non expiré',
            },
            {
                id: 'enabled',
                type: CheckboxForm,
                label: 'Activé',
            },
            {
                id: 'isVerified',
                type: CheckboxForm,
                label: 'vérifié',
            },
            {
                id: 'address',
                type: AddressEntityForm,
                label: 'Addresse',
                fields: addressFormFields,
            },
            {
                id: 'avatar',
                type: UrlInput,
                label: 'Avatar',
                placeholder: 'https://myavatar.com',
                validators: [Validators.required],
            },
        ],
    }

    getRoles = (id: number) => {
        this.store.dispatch(
            UserActions.getRelatedEntities({ id: id, relation: 'roles' })
        )

        return this.store
            .select(UserSelectors.selectRelatedEntitiesLoaded(id, 'roles'))
            .pipe(
                filter(ids => ids !== null),
                switchMap(ids => {
                    return this.store.select(
                        RoleSelectors.selectSelection(ids as number[])
                    )
                })
            )
    }
}
