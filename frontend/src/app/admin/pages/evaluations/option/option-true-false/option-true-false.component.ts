/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CheckboxForm,
    DynamicSelectForm,
    HiddenInput,
    MediaBooleanEntityForm,
    MediaTextEntityForm,
} from '@admin/forms/Forms'
import { mediaBooleanFormFields } from '@admin/forms/form-field/mediaBooleanFormField'
import { mediaTextFormFields } from '@admin/forms/form-field/mediaTextFormField'
import { EntityFormModel } from '@admin/forms/forms.types'
import { createDynamicOptions } from '@admin/forms/forms.utility'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { OptionTrueFalse } from '@core/entity/evaluation/option-true-false.entity'
import { QuestionTrueFalse } from '@core/entity/evaluation/question-true-false.entity'
import { SharedModule } from '@shared/shared.module'
import { OptionTrueFalseActions } from '@store/entities/evaluation/option/question-true-false/option-true-false.actions'
import { OptionTrueFalseSelectors } from '@store/entities/evaluation/option/question-true-false/option-true-false.selectors'
import { QuestionTrueFalseActions } from '@store/entities/evaluation/question/question-true-false/question-true-false.actions'
import { QuestionTrueFalseSelectors } from '@store/entities/evaluation/question/question-true-false/question-true-false.selectors'
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
        title: 'Option Vrai ou Faux',
        name: 'option vrai ou faux',
        plural: 'options vrai ou faux',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des options vrai ou faux',
        exportable: true,
    }
    override entityFormModel: EntityFormModel<OptionTrueFalse> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Option Vrai ou Faux',
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
                id: 'type',
                type: HiddenInput,
                default: 'true-false',
                label: 'Type',
                hide: true,
            },
            {
                id: 'content',
                type: MediaBooleanEntityForm,
                label: "Contenu de l'option",
                fields: mediaBooleanFormFields,
            },
            {
                id: 'explanation',
                type: MediaTextEntityForm,
                label: 'Explication',
                fields: mediaTextFormFields,
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
                entity: 'questionTrueFalses',
                sortable: false,
                type: DynamicSelectForm,
                label: 'Question Vrai ou Faux',
                placeholder: 'Selectionnez la Question Vrai ou Faux',
                dynamicOptions: createDynamicOptions<
                    OptionTrueFalse,
                    QuestionTrueFalse
                >(
                    this.store,
                    this.selectors,
                    this.actions,
                    QuestionTrueFalseSelectors,
                    QuestionTrueFalseActions,
                    'id',
                    'question'
                ),
                validators: [Validators.required],
            },
        ],
    }
}
