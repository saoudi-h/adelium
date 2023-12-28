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
import { QuizDefault } from '@core/entity/evaluation/quiz-default.entity'
import { Quiz } from '@core/entity/evaluation/quiz.entity'
import { SharedModule } from '@shared/shared.module'
import { QuizDefaultActions } from '@store/evaluation/quiz/quiz-default/quiz-default.actions'
import { QuizDefaultSelectors } from '@store/evaluation/quiz/quiz-default/quiz-default.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-quiz-default]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../../base/base.component.html',
    styleUrl: '../../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminQuizDefaultComponent extends BaseAdminComponent<QuizDefault> {
    override selectors = QuizDefaultSelectors
    override actions = QuizDefaultActions
    override entities$!: Observable<QuizDefault[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Quiz généraux',
        name: 'quiz général',
        plural: 'quiz généraux',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des quiz généraux',
    }
    override entityFormModel: EntityFormModel<Quiz> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Quiz général',
        id: 'quiz-default',
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
