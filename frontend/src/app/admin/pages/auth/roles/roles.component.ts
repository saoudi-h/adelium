import { TextInput } from '@admin/forms/Forms'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { Role } from '@core/entity/auth/role.entity'
import { SharedModule } from '@shared/shared.module'
import { RoleActions } from '@store/role/role.actions'
import { RoleSelectors } from '@store/role/role.selectors'
import { Observable } from 'rxjs'
import { EntityFormModel } from '../../../forms/forms.types'
import { BaseTrComponent } from '../../base/base-tr.component'
import { BaseAdminComponent } from '../../base/base.component'

@Component({
    selector: '[admin-roles]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../base/base.component.html',
    styleUrl: '../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminRolesComponent extends BaseAdminComponent<Role> {
    override selectors = RoleSelectors
    override actions = RoleActions
    override entities$!: Observable<Role[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Rôles',
        name: 'role',
        plural: 'roles',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des rôles',
    }
    override entityFormModel: EntityFormModel<Role> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Rôle',
        id: 'role',
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
                id: 'name',
                sortable: true,
                type: TextInput,
                label: 'Nom',
                placeholder: 'Administrateur',
                validators: [Validators.required, Validators.maxLength(50)],
            },
        ],
    }
}
