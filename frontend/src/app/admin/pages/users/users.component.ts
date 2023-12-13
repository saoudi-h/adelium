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
import { User } from '@core/entity/user.entity'
import { SharedModule } from '@shared/shared.module'
import { UserActions } from '@store/user/user.actions'
import { UserSelectors } from '@store/user/user.selectors'
import { Observable } from 'rxjs'
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
}
