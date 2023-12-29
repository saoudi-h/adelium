/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxForm, TextInput } from '@admin/forms/Forms'
import { EntityFormModel } from '@admin/forms/forms.types'
import { baseAnimations } from '@admin/pages/base/base-animations.animation'
import { BaseTrComponent } from '@admin/pages/base/base-tr.component'
import { BaseAdminComponent } from '@admin/pages/base/base.component'
import { AdminConfig } from '@admin/pages/base/components/admin-config.types'
import { ViewLayoutComponent } from '@admin/pages/base/components/view-layout.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import { SharedModule } from '@shared/shared.module'
import { QuizMcqActions } from '@store/entities/evaluation/quiz/quiz-mcq/quiz-mcq.actions'
import { QuizMcqSelectors } from '@store/entities/evaluation/quiz/quiz-mcq/quiz-mcq.selectors'
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
            // {
            //     id: 'questions',
            //     sortable: true,
            //     type: TextInput,
            //     label: 'Questions',
            //     validators: [Validators.required, Validators.maxLength(50)],
            // }
        ],
    }
}
