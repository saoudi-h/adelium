/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput } from '@admin/forms/Forms'
import { EntityFormModel } from '@admin/forms/forms.types'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { Tag } from '@core/entity/evaluation/tag.entity'
import { SharedModule } from '@shared/shared.module'
import { TagActions } from '@store/entities/evaluation/tag/tag.actions'
import { TagSelectors } from '@store/entities/evaluation/tag/tag.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-tag]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../base/base.component.html',
    styleUrl: '../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminTagComponent extends BaseAdminComponent<Tag> {
    override selectors = TagSelectors
    override actions = TagActions
    override entities$!: Observable<Tag[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Tag a choix multiples',
        name: 'tag a choix multiples',
        plural: 'tag a choix multiples',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des tag a choix multiples',
    }
    override entityFormModel: EntityFormModel<Tag> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Tag a choix multiples',
        id: 'tag',
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
                placeholder: 'Nom du tag',
                validators: [Validators.required, Validators.maxLength(50)],
            },
        ],
    }
}
