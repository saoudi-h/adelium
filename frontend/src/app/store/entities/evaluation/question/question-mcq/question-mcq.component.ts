/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CheckboxForm,
    MultiDynamicSelectForm,
    NumberInput,
    TextInput,
} from '@admin/forms/Forms'
import { EntityFormModel } from '@admin/forms/forms.types'
import { createMultiDynamicOptions } from '@admin/forms/forms.utility'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { Tag } from '@core/entity/evaluation/tag.entity'
import { SharedModule } from '@shared/shared.module'
import { QuestionMcqActions } from '@store/entities/evaluation/question/question-mcq/question-mcq.actions'
import { QuestionMcqSelectors } from '@store/entities/evaluation/question/question-mcq/question-mcq.selectors'
import { TagActions } from '@store/entities/evaluation/tag/tag.actions'
import { TagSelectors } from '@store/entities/evaluation/tag/tag.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-question-mcq]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../../base/base.component.html',
    styleUrl: '../../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminQuestionMcqComponent extends BaseAdminComponent<QuestionMcq> {
    override selectors = QuestionMcqSelectors
    override actions = QuestionMcqActions
    override entities$!: Observable<QuestionMcq[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Question a choix multiples',
        name: 'question a choix multiples',
        plural: 'question a choix multiples',
        masculin: true,
        subtitle:
            'Ajouter, modifier et supprimer des question a choix multiples',
    }
    override entityFormModel: EntityFormModel<QuestionMcq> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Question a choix multiples',
        id: 'question-mcq',
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
                placeholder: 'Contenu de la question',
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
            // {
            //     id: 'options',
            //     sortable: false,
            //     type: MultiDynamicSelectForm,
            //     label: 'Options',
            //     placeholder: 'Selectionnez les options',
            //     dynamicOptions: createMultiDynamicOptions<QuestionMcq, OptionMcq>(
            //         this.store,
            //         this.selectors,
            //         this.actions,
            //         OptionSelectors,
            //         OptionActions,
            //         'name',
            //         'options'
            //     ),
            // },
            {
                id: 'enabled',
                sortable: false,
                type: CheckboxForm,
                label: 'Activé',
            },
            {
                id: 'tags',
                sortable: false,
                type: MultiDynamicSelectForm,
                label: 'Tag',
                placeholder: 'Selectionnez les Tags',
                dynamicOptions: createMultiDynamicOptions<QuestionMcq, Tag>(
                    this.store,
                    this.selectors,
                    this.actions,
                    TagSelectors,
                    TagActions,
                    'name',
                    'tags'
                ),
            },
        ],
    }
}
