/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxForm, HiddenInput } from '@admin/forms/Forms'
import { EntityFormModel } from '@admin/forms/forms.types'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { MediaBoolean } from '@core/entity/evaluation/media-boolean.entity'
import { SharedModule } from '@shared/shared.module'
import { MediaBooleanActions } from '@store/entities/evaluation/media/media-boolean/media-boolean.actions'
import { MediaBooleanSelectors } from '@store/entities/evaluation/media/media-boolean/media-boolean.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-media-boolean]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../../base/base.component.html',
    styleUrl: '../../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminMediaBooleanComponent extends BaseAdminComponent<MediaBoolean> {
    override selectors = MediaBooleanSelectors
    override actions = MediaBooleanActions
    override entities$!: Observable<MediaBoolean[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Media Boolean',
        name: 'Media Boolean',
        plural: 'Media Booleans',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des Media Boolean',
    }
    override entityFormModel: EntityFormModel<MediaBoolean> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Booléen Média',
        id: 'media-boolean',
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
                id: 'type',
                type: HiddenInput,
                default: 'default',
                label: 'Type',
                hide: true,
            },
            {
                id: 'content',
                sortable: true,
                type: CheckboxForm,
                label: 'Contenu',
                placeholder: 'Contenu',
                validators: [Validators.required],
            },
        ],
    }
}
