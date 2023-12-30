/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CheckboxForm,
    MultiDynamicSelectForm,
    TextInput,
} from '@admin/forms/Forms'
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
import { BankDefault } from '@core/entity/evaluation/bank-default.entity'
import { Tag } from '@core/entity/evaluation/tag.entity'
import { SharedModule } from '@shared/shared.module'
import { BankDefaultActions } from '@store/entities/evaluation/bank/bank-default/bank-default.actions'
import { BankDefaultSelectors } from '@store/entities/evaluation/bank/bank-default/bank-default.selectors'
import { TagActions } from '@store/entities/evaluation/tag/tag.actions'
import { TagSelectors } from '@store/entities/evaluation/tag/tag.selectors'
import { Observable } from 'rxjs'

@Component({
    selector: '[admin-bank-default]',
    imports: [CommonModule, SharedModule, ViewLayoutComponent, BaseTrComponent],
    standalone: true,
    templateUrl: '../../../base/base.component.html',
    styleUrl: '../../../base/base.component.sass',
    animations: baseAnimations,
})
export class AdminBankDefaultComponent extends BaseAdminComponent<BankDefault> {
    override selectors = BankDefaultSelectors
    override actions = BankDefaultActions
    override entities$!: Observable<BankDefault[]>
    override isLoading$!: Observable<boolean>
    override error$!: Observable<string | null>
    override config: AdminConfig = {
        title: 'Bank généraux',
        name: 'bank général',
        plural: 'bank généraux',
        masculin: true,
        subtitle: 'Ajouter, modifier et supprimer des bank généraux',
    }
    override entityFormModel: EntityFormModel<BankDefault> = {
        onEdit: this.editOne,
        onAdd: this.addOne,
        selectTransactionStatus: this.selectTransactionStatus,
        actionType: 'add',
        title: 'Bank général',
        id: 'bank-default',
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
                placeholder: 'Nom du bank',
                validators: [Validators.required, Validators.maxLength(50)],
            },
            {
                id: 'description',
                sortable: true,
                type: TextInput,
                label: 'Description',
                placeholder: 'Description du bank',
                validators: [Validators.required],
            },
            {
                id: 'enabled',
                sortable: true,
                type: CheckboxForm,
                label: 'Actif',
            },
            {
                id: 'tags',
                sortable: false,
                type: MultiDynamicSelectForm,
                label: 'Tag',
                placeholder: 'Selectionnez les Tags',
                dynamicOptions: createDynamicOptions<BankDefault, Tag>(
                    this.store,
                    this.selectors,
                    this.actions,
                    TagSelectors,
                    TagActions,
                    'name',
                    'tags'
                ),
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
