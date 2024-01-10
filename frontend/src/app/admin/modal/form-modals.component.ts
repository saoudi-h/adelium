/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityFormModel } from '@admin/forms/forms.types'
import { CheckBoxFieldComponent } from '@admin/forms/ui/checkbox/checkbox-field.component'
import { DynamicSelectFieldComponent } from '@admin/forms/ui/dynamic-select/dynamic-select-field.component'
import { InputFieldComponent } from '@admin/forms/ui/input/input-field.component'
import { SelectFieldComponent } from '@admin/forms/ui/select/select-field.component'
import { FormModalService } from '@admin/modal/formModal.service'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { CloseIconComponent } from '@shared/components/icons/close-icon.component'
import { SharedModule } from '@shared/shared.module'
import { Observable } from 'rxjs'
import { AdminFormComponent } from './admin-form.component'
import { FormFieldsComponent } from './form-fields.component'
import { FormModalComponent } from './form-modal.component'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        FormModalComponent,
        InputFieldComponent,
        CheckBoxFieldComponent,
        SelectFieldComponent,
        DynamicSelectFieldComponent,
        FormFieldsComponent,
        CloseIconComponent,
        AdminFormComponent,
    ],
    selector: 'app-form-modals',
    template: ` @for (
        modalConfig of formModalStack$ | async;
        track modalConfig;
        let i = $index
    ) {
        <div
            form-modal
            (closeModal)="close()"
            [modalConfig]="modalConfig"
            [active]="i === ((formModalStack$ | async)?.length || 0 - 1)"></div>
    }`,
})
export class FormModalsComponent<T extends Identifiable> {
    formModalStack$: Observable<EntityFormModel<T>[]>
    constructor(private formModalService: FormModalService<T>) {
        this.formModalStack$ = formModalService.formModalStack$
    }

    close() {
        this.formModalService.closeFormModal()
    }

    closeAllModals() {
        this.formModalService.closeAllFormModals()
    }
}
