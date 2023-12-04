import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { User } from '@core/entity/user.entity'
import { UserService } from '@core/services/user.service'
import { EntityAttribute } from '@core/utility/types'
import { BaseAdminPageComponent } from '@shared/directives/base-admin-page-component'
import { SharedModule } from '@shared/shared.module'
@Component({
    standalone: true,
    selector: '[admin-users]',
    imports: [CommonModule, SharedModule],
    templateUrl: 'users.component.html',
    styleUrl: 'users.component.sass',
})
export class AdminUsersComponent
    extends BaseAdminPageComponent<User>
    implements OnInit
{
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
    override attributes: EntityAttribute[] = [
        {
            key: 'id',
            name: 'ID',
            type: 'id',
        },
        {
            key: 'firstname',
            name: 'first name',
            type: 'text',
            required: true,
        },
        {
            key: 'lastname',
            name: 'last name',
            type: 'string',
            required: true,
        },
        {
            key: 'username',
            name: 'Email',
            type: 'email',
            required: true,
        },
        {
            key: 'phone',
            name: 'Phone',
            type: 'phone',
            required: true,
        },
        {
            key: 'authorities',
            name: 'authorities',
            type: 'select',
            required: true,
        },
        {
            key: 'status',
            name: 'status',
            type: 'boolean',
            required: true,
        },
        {
            key: 'enabled',
            name: 'enabled',
            type: 'boolean',
            required: true,
        },
        {
            key: 'accountNonLocked',
            name: 'accountNonLocked',
            type: 'boolean',
            required: true,
        },
        {
            key: 'accountNonExpired',
            name: 'accountNonExpired',
            type: 'boolean',
            required: true,
        },
        {
            key: 'createdAt',
            name: 'createdAt',
            type: 'date',
            required: true,
        },
        {
            key: 'updatedAt',
            name: 'updatedAt',
            type: 'date',
            required: true,
        },
        {
            key: 'avatar',
            name: 'avatar',
            type: 'image',
            required: false,
        },
    ]

    constructor(
        public override dialog: MatDialog,
        public override service: UserService
    ) {
        super()
    }
    ngOnInit(): void {
        this.getPage(this.tableData)
    }
}
