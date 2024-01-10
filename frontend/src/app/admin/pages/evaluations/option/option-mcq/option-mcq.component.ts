/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CheckboxForm,
    HiddenInput,
    MultiDynamicSelectForm,
    TextInput,
} from '@admin/forms/Forms'
import { EntityFormModel } from '@admin/forms/forms.types'
import { createExternalDynamicOptions } from '@admin/forms/forms.utility'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { OptionMcq } from '@core/entity/evaluation/option-mcq.entity'
import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { SharedModule } from '@shared/shared.module'
import { OptionMcqActions } from '@store/entities/evaluation/option/question-mcq/option-mcq.actions'
import { OptionMcqSelectors } from '@store/entities/evaluation/option/question-mcq/option-mcq.selectors'
import { QuestionMcqActions } from '@store/entities/evaluation/question/question-mcq/question-mcq.actions'
import { QuestionMcqSelectors } from '@store/entities/evaluation/question/question-mcq/question-mcq.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-option-mcq]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../../base/base.component.html',
    styleUrl: '../../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminOptionMcqComponent extends BaseAdminComponent<OptionMcq> {
    override selectors = OptionMcqSelectors
    override actions = OptionMcqActions
    override entities$!: Observable<OptionMcq[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Option a choix multiples',
        name: 'option a choix multiples',
        plural: 'options a choix multiples',
        masculin: true,
        subtitle:
            'Ajouter, modifier et supprimer des options a choix multiples',
    }
    override entityFormModel: EntityFormModel<OptionMcq> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Option a choix multiples',
        id: 'option-mcq',
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
                placeholder: "Contenu de l'option",
                validators: [Validators.required],
            },
            {
                id: 'explanation',
                sortable: false,
                type: TextInput,
                label: 'Explication',
                placeholder: 'Explication de la option',
                validators: [Validators.required],
            },
            {
                id: 'enabled',
                sortable: false,
                type: CheckboxForm,
                label: 'Activé',
            },
            {
                id: 'correct',
                sortable: false,
                type: CheckboxForm,
                label: 'Correct',
            },
            {
                id: 'question',
                sortable: false,
                type: MultiDynamicSelectForm,
                label: 'Question Qcm',
                placeholder: 'Selectionnez la Question Qcm',
                dynamicOptions: createExternalDynamicOptions<QuestionMcq>(
                    this.store,
                    QuestionMcqSelectors,
                    QuestionMcqActions,
                    'question'
                ),
                validators: [Validators.required],
            },
        ],
    }
}
