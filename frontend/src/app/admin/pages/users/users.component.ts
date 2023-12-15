import {
    CheckboxForm,
    EmailInput,
    MultiSelectForm,
    PasswordInput,
    TelInput,
    TextInput,
    UrlInput,
} from '@admin/forms/Forms'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminConfig } from '@admin/components/base-admin/admin-config.types'
import { BaseAdminComponent } from '@admin/components/base-admin/base-admin.component'
import { ViewLayoutComponent } from '@admin/components/base-admin/view-layout.component'
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
import { User } from '@core/entity/user.entity'
import { CustomValidators } from '@core/utility/CustomValidators'
import { SharedModule } from '@shared/shared.module'
import { UserActions } from '@store/user/user.actions'
import { UserSelectors } from '@store/user/user.selectors'
import { Observable } from 'rxjs'
import { EntityFormModel } from './../../forms/forms.types'
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
    template: ` <section
        view-layout
        [config]="config"
        [paginationResult$]="paginationResult$"
        (add)="onAdd()"
        (pageChange)="onPageChange($event)">
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
            'Utilisateur',
            'Addresse',
            'Autorisations',
            'Status',
            'Securité',
            'Autres',
            'Actions',
        ],
        subtitle: 'Ajouter, modifier et supprimer des utilisateurs',
    }
    override entityFormModel: EntityFormModel<User> = {
        onFormSubmit: (formValue: any) => {
            console.log(formValue)
        },
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
                id: 'password',
                type: PasswordInput,
                label: 'Mot de passe',
                placeholder: '********',
                validators: [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(8),
                    CustomValidators.password,
                ],
            },
            {
                id: 'roles',
                type: MultiSelectForm,
                label: 'Role',
                placeholder: 'Selectionnez les Roles',
                options: [
                    {
                        label: 'Utilisateur',
                        value: 'user',
                    },
                    {
                        label: 'Administrateur',
                        value: 'admin',
                    },
                ],
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
                validators: [Validators.required],
            },
            {
                id: 'credentialsNonExpired',
                type: CheckboxForm,
                label: 'Mot de passe non expiré',
                validators: [Validators.required],
            },
            {
                id: 'enabled',
                type: CheckboxForm,
                label: 'Activé',
                validators: [Validators.required],
            },
            {
                id: 'isVerified',
                type: CheckboxForm,
                label: 'vérifié',
                validators: [Validators.required],
            },
            {
                id: 'address',
                type: TextInput,
                label: 'Addresse',
                validators: [Validators.required],
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
}
