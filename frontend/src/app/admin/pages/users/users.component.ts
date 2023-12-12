import { AdminConfig } from '@admin/components/base-admin/admin-config.types'
import { BaseAdminComponent } from '@admin/components/base-admin/base-admin.component'
import { ViewLayoutComponent } from '@admin/components/base-admin/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { User } from '@core/entity/user.entity'
import { SharedModule } from '@shared/shared.module'
import { UserActions } from '@store/user/user.actions'
import { UserSelectors } from '@store/user/user.selectors'
import { Observable } from 'rxjs'
import { UserAdminTbodyComponent } from './user-admin-tbody.component'
@Component({
    standalone: true,
    selector: '[admin-users]',
    imports: [
        CommonModule,
        SharedModule,
        ViewLayoutComponent,
        UserAdminTbodyComponent,
    ],
    template: ` <button
            class="btn btn-outline join-item"
            (click)="loadFirst = !loadFirst">
            test
        </button>
        <section
            view-layout
            [config]="config"
            [paginationResult$]="paginationResult$">
            <!-- tbody -->
            <tbody
                *ngIf="entities$"
                class=""
                user-admin-tbody
                [entities$]="entities$"
                [isLoading$]="isLoading$"
                [error$]="error$"
                (delete)="onDelete($event)"
                (edit)="onEdit($event)"></tbody>
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
    testIsTrue = false
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
    loadFirst = true
}
