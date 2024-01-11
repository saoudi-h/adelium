/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CheckboxForm,
    DynamicExternalSelectForm,
    HiddenInput,
    ImageUrlFileForm,
    MultiDynamicSelectForm,
    TextInput,
} from '@admin/forms/Forms'
import { EntityFormModel } from '@admin/forms/forms.types'
import {
    createExternalDynamicOptions,
    createMultiDynamicOptions,
} from '@admin/forms/forms.utility'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { User } from '@core/entity/auth/user.entity'
import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import { Tag } from '@core/entity/evaluation/tag.entity'
import { SharedModule } from '@shared/shared.module'
import { UserActions } from '@store/entities/auth/user/user.actions'
import { UserSelectors } from '@store/entities/auth/user/user.selectors'
import { QuizMcqActions } from '@store/entities/evaluation/quiz/quiz-mcq/quiz-mcq.actions'
import { QuizMcqSelectors } from '@store/entities/evaluation/quiz/quiz-mcq/quiz-mcq.selectors'
import { TagActions } from '@store/entities/evaluation/tag/tag.actions'
import { TagSelectors } from '@store/entities/evaluation/tag/tag.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-quiz-mcq]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../../base/base.component.html',
    styleUrl: '../../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminQuizMcqComponent extends BaseAdminComponent<QuizMcq> {
    override selectors = QuizMcqSelectors
    override actions = QuizMcqActions
    override entities$!: Observable<QuizMcq[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Quiz a choix multiples',
        name: 'quiz a choix multiples',
        plural: 'quiz a choix multiples',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des quiz a choix multiples',
    }
    override entityFormModel: EntityFormModel<QuizMcq> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Quiz a choix multiples',
        id: 'quiz-mcq',
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
                default: 'mcq',
                label: 'Type',
                hide: true,
            },
            {
                id: 'name',
                sortable: true,
                type: TextInput,
                label: 'Nom',
                placeholder: 'Nom du quiz',
                validators: [Validators.required, Validators.maxLength(50)],
            },
            {
                id: 'description',
                sortable: true,
                type: TextInput,
                label: 'Description',
                placeholder: 'Description du quiz',
                validators: [Validators.required],
            },
            {
                id: 'enabled',
                sortable: true,
                type: CheckboxForm,
                label: 'Actif',
            },
            {
                id: 'public',
                sortable: true,
                type: CheckboxForm,
                label: 'public',
            },
            {
                id: 'tags',
                sortable: false,
                type: MultiDynamicSelectForm,
                label: 'Tag',
                placeholder: 'Selectionnez les Tags',
                dynamicOptions: createMultiDynamicOptions<QuizMcq, Tag>(
                    this.store,
                    this.selectors,
                    this.actions,
                    TagSelectors,
                    TagActions,
                    'name',
                    'tags'
                ),
            },

            {
                id: 'imageUrl',
                sortable: false,
                type: ImageUrlFileForm,
                label: 'Image',
                placeholder: 'Selectionnez une image',
                validators: [Validators.required],
            },
            {
                id: 'ownerId',
                sortable: false,
                type: DynamicExternalSelectForm,
                label: 'Propriétaire',
                placeholder: 'Selectionnez un propriétaire',
                dynamicOptions: createExternalDynamicOptions<User>(
                    this.store,
                    UserSelectors,
                    UserActions,
                    'username'
                ),
            },
        ],
    }
}
