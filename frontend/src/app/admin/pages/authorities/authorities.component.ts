import { TextInput } from '@admin/forms/Forms'
import { AuthoritySelectors } from './../../../store/authority/authority.selectors'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { Authority } from '@core/entity/authority.entity'
import { SharedModule } from '@shared/shared.module'
import { AuthorityActions } from '@store/authority/authority.actions'
import { Observable } from 'rxjs'
import { EntityFormModel } from '../../forms/forms.types'
@Component({
    selector: '[admin-authorities]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../base/base.component.html',
    styleUrl: '../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminAuthoritiesComponent extends BaseAdminComponent<Authority> {
    override selectors = AuthoritySelectors
    override actions = AuthorityActions
    override entities$!: Observable<Authority[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Autorisation',
        name: 'authorisation',
        plural: 'autorisations',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des autorisations',
    }
    override entityFormModel: EntityFormModel<Authority> = {
        onFormSubmit: (formValue: any) => {
            console.log(formValue)
        },
        title: 'Rôle',
        id: 'authority',
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
                id: 'authority',
                type: TextInput,
                label: 'Nom',
                placeholder: 'Administrateur',
                validators: [Validators.required, Validators.maxLength(50)],
            },
        ],
    }
}
