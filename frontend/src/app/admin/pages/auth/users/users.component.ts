/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CheckboxForm,
    EmailInput,
    EntityForm,
    MultiDynamicSelectForm,
    NumberInput,
    TelInput,
    TextInput,
    UrlInput,
} from '@admin/forms/Forms'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import {
    animate,
    keyframes,
    style,
    transition,
    trigger,
} from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { User } from '@core/entity/auth/user.entity'
import { SharedModule } from '@shared/shared.module'
import { RoleActions } from '@store/entities/auth/role/role.actions'
import { RoleSelectors } from '@store/entities/auth/role/role.selectors'
import { UserActions } from '@store/entities/auth/user/user.actions'
import { UserSelectors } from '@store/entities/auth/user/user.selectors'
import { PaginationParams } from '@store/generic/generic.reducer'
import { Observable, filter, map, switchMap } from 'rxjs'
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
    animations: [
        trigger('bodyAnimation', [
            transition(':increment', [
                animate(
                    '600ms ease-out',
                    keyframes([
                        style({
                            transform: 'translateX(0%)',
                            opacity: 1,
                            offset: 0,
                        }),
                        style({
                            transform: 'translateX(-50%)',
                            opacity: 0,
                            offset: 0.5,
                        }),
                        style({
                            transform: 'translateX(0%)',
                            opacity: 0,
                            offset: 0.6,
                        }),
                        style({
                            transform: 'translateX(0)',
                            opacity: 1,
                            offset: 1.0,
                        }),
                    ])
                ),
            ]),
            transition(':decrement', [
                animate(
                    '600ms ease-out',
                    keyframes([
                        style({
                            transform: 'translateX(0%)',
                            opacity: 1,
                            offset: 0,
                        }),
                        style({
                            transform: 'translateX(50%)',
                            opacity: 0,
                            offset: 0.5,
                        }),
                        style({
                            transform: 'translateX(0%)',
                            opacity: 0,
                            offset: 0.6,
                        }),
                        style({
                            transform: 'translateX(0)',
                            opacity: 1,
                            offset: 1.0,
                        }),
                    ])
                ),
            ]),
        ]),
        trigger('rowAnimation', [
            transition(':leave', [
                animate(
                    '600ms 200ms ease-out',
                    keyframes([
                        style({
                            transform: 'translateX(0)',
                            backgroundColor: 'rgba(235, 29, 33, 1)',
                            opacity: 1,
                            offset: 0,
                        }),
                        style({
                            transform: 'translateX(-10%)',
                            backgroundColor: 'rgba(235, 29, 33, 1)',
                            opacity: 0.8,
                            offset: 0.3,
                        }),
                        style({
                            transform: 'translateX(50%)',
                            backgroundColor: 'rgba(235, 29, 33, 1)',
                            opacity: 0,
                            offset: 1.0,
                        }),
                    ])
                ),
            ]),
        ]),
    ],
    template: `<section
        view-layout
        [config]="config"
        [paginationResult$]="paginationResult$"
        (add)="onAdd()"
        (pageChange)="onPageChange($event)"
        (sortChange)="onSortChange($event)"
        [sortState]="sortState">
        <!-- tbody -->
        <!-- <tbody
            *ngIf="entities$"
            class=""
            user-admin-tbody
            [entities$]="entities$"
            [isLoading$]="isLoading$"
            [error$]="error$"
            (delete)="onDelete($event)"
            (edit)="onEdit($event)"></tbody> -->

        @if (error$ | async; as errorMessage) {
            <div>error : {{ errorMessage }}</div>
        }
        @if (entities$ | async; as entities) {
            @if (paginationResult$ | async; as pagination) {
                <tbody [@bodyAnimation]="pagination.number">
                    @for (entity of entities; track entity) {
                        <tr
                            user-admin-tr
                            @rowAnimation
                            [@.disabled]="!entity['isDeleting']"
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
                dynamicOptions: {
                    all: () =>
                        this.store.select(RoleSelectors.selectAll).pipe(
                            map(roles =>
                                roles.map(role => ({
                                    label: role.name,
                                    value: role.id,
                                }))
                            )
                        ),
                    getNextPage: (params: PaginationParams) => {
                        return this.store.dispatch(
                            RoleActions.getPage({ params: params })
                        )
                    },
                    getInitialById: (userId: number) => {
                        this.store.dispatch(
                            UserActions.getRelatedEntities({
                                id: userId,
                                relation: 'roles',
                            })
                        )

                        return this.store
                            .select(
                                UserSelectors.selectRelatedEntities({
                                    id: userId,
                                    relation: 'roles',
                                })
                            )
                            .pipe(
                                switchMap(rolesId =>
                                    this.store
                                        .select(RoleSelectors.selectAll)
                                        .pipe(
                                            map(roles =>
                                                roles
                                                    .filter(role =>
                                                        rolesId
                                                            ? rolesId.includes(
                                                                  role.id
                                                              )
                                                            : false
                                                    )
                                                    .map(role => ({
                                                        label: role.name,
                                                        value: role.id,
                                                    }))
                                            )
                                        )
                                )
                            )
                    },
                    paginationResult: () =>
                        this.store.select(RoleSelectors.selectPaginationResult),
                    setRelations: (
                        id: number,
                        relation: string,
                        relatedEntityIds: number[]
                    ) => {
                        this.store.dispatch(
                            UserActions.updateRelatedEntities({
                                id,
                                relation,
                                relatedEntityIds,
                            })
                        )
                    },
                },
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
                type: EntityForm,
                fields: [
                    {
                        id: 'streetNumber',
                        type: NumberInput,
                        label: 'Numéro de rue',
                        validators: [Validators.required, Validators.max(9999)],
                    },
                    {
                        id: 'street',
                        type: TextInput,
                        label: 'Rue',
                        validators: [Validators.required],
                    },
                    {
                        id: 'additionalInfo',
                        type: TextInput,
                        label: "Complément d'addresse",
                    },
                    {
                        id: 'city',
                        type: TextInput,
                        label: 'Ville',
                        validators: [Validators.required],
                    },
                    {
                        id: 'postalCode',
                        type: NumberInput,
                        label: 'Code postal',
                        validators: [Validators.required],
                    },
                    {
                        id: 'country',
                        type: TextInput,
                        label: 'Pays',
                        validators: [Validators.required],
                    },
                    {
                        id: 'departmentNumber',
                        type: NumberInput,
                        label: 'Numéro de département',
                    },
                ],
                label: 'Addresse',
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
