/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxForm, NumberInput, TextInput } from '@admin/forms/Forms'
import { EntityFormModel } from '@admin/forms/forms.types'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { OptionTrueFalse } from '@core/entity/evaluation/option-true-false.entity'
import { SharedModule } from '@shared/shared.module'
import { OptionTrueFalseActions } from '@store/entities/evaluation/option/question-true-false/option-true-false.actions'
import { OptionTrueFalseSelectors } from '@store/entities/evaluation/option/question-true-false/option-true-false.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-option-true-false]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../../base/base.component.html',
    styleUrl: '../../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminOptionTrueFalseComponent extends BaseAdminComponent<OptionTrueFalse> {
    override selectors = OptionTrueFalseSelectors
    override actions = OptionTrueFalseActions
    override entities$!: Observable<OptionTrueFalse[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Option a choix multiples',
        name: 'option a choix multiples',
        plural: 'option a choix multiples',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des option a choix multiples',
    }
    override entityFormModel: EntityFormModel<OptionTrueFalse> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Option a choix multiples',
        id: 'option-true-false',
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
                id: 'content',
                sortable: true,
                type: TextInput,
                label: 'Contenu',
                placeholder: 'Contenu de la option',
                validators: [Validators.required],
            },
            {
                id: 'numberOfOptions',
                sortable: false,
                type: NumberInput,
                label: "Nombre d'options",
                placeholder: "Nombre d'options",
                validators: [
                    Validators.required,
                    Validators.max(10),
                    Validators.min(2),
                ],
            },
            {
                id: 'enabled',
                sortable: false,
                type: CheckboxForm,
                label: 'Activé',
            },
        ],
    }
}
