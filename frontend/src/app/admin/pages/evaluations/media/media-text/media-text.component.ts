/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiddenInput, TextInput } from '@admin/forms/Forms'
import { EntityFormModel } from '@admin/forms/forms.types'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { MediaText } from '@core/entity/evaluation/media-text.entity'
import { SharedModule } from '@shared/shared.module'
import { MediaTextActions } from '@store/entities/evaluation/media/media-text/media-text.actions'
import { MediaTextSelectors } from '@store/entities/evaluation/media/media-text/media-text.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-media-text]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../../base/base.component.html',
    styleUrl: '../../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminMediaTextComponent extends BaseAdminComponent<MediaText> {
    override selectors = MediaTextSelectors
    override actions = MediaTextActions
    override entities$!: Observable<MediaText[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Media Text',
        name: 'Media Text',
        plural: 'Media Texts',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des Media Text',
    }
    override entityFormModel: EntityFormModel<MediaText> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Texte Media',
        id: 'media-text',
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
                type: TextInput,
                label: 'Contenu',
                placeholder: 'Contenu',
                validators: [Validators.required],
            },
        ],
    }
}
