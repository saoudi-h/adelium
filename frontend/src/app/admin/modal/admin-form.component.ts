/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityFormModel, FormField } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Type,
} from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Identifiable } from '@core/entity/identifiable.interface'
import { IconService } from '@core/services/icon.service'
import { NotificationService } from '@core/services/notification.service'
import { CloseIconComponent } from '@shared/components/icons/close-icon.component'
import { SharedModule } from '@shared/shared.module'
import { Subscription } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { EntityForm } from '../forms/Forms'
import { FormFieldsComponent } from './form-fields.component'

@Component({
    standalone: true,
    selector: '[admin-form]',
    imports: [
        CommonModule,
        SharedModule,
        FormFieldsComponent,
        CloseIconComponent,
        ReactiveFormsModule,
    ],
    template: `<!-- Content modal -->
        <form class="" [formGroup]="group">
            <!-- Content - Header -->
            <div class="px-8 py-8">
                <h3 class="text-3xl font-bold text-primary">
                    {{ modalConfig.title }}
                </h3>
                <p class="text-sm text-primary/70">
                    {{ modalConfig.additionalInfo }}
                </p>
            </div>

            <!-- Content - Body -->
            <div
                class="mx-auto rounded-t-[3rem] bg-base-100 px-8 py-12 shadow-xl shadow-black">
                <div
                    form-fields
                    [group]="group"
                    [fields]="modalConfig.fields"
                    [id]="modalConfig.initialValue?.id"
                    class=" grid grid-cols-1 flex-row flex-wrap gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
            </div>
            <!-- Content - Footer -->
            <div class="bg-base-100 px-8 py-8 ">
                <div class="modal-action">
                    @for (action of modalConfig.actions; track action) {
                        @if (action.type === 'submit') {
                            <div class="form-control mt-6">
                                <button
                                    [type]="action.type"
                                    (click)="onSubmit(action.action)"
                                    [disabled]="!group.valid"
                                    class="btn"
                                    [ngClass]="getColorClass(action.color)">
                                    @if (action.icon) {
                                        <div class="mr-2 h-6 w-6">
                                            <ng-container
                                                *ngComponentOutlet="
                                                    getIconComponent(
                                                        action.icon
                                                    )
                                                " />
                                        </div>
                                    }
                                    <span>{{ action.label }}</span>
                                </button>
                            </div>
                        } @else {
                            <div class="form-control mt-6">
                                <button
                                    [type]="action.type"
                                    (click)="action.action()"
                                    class="btn"
                                    [ngClass]="getColorClass(action.color)">
                                    @if (action.icon) {
                                        <div class="mr-2 h-6 w-6">
                                            <ng-container
                                                *ngComponentOutlet="
                                                    getIconComponent(
                                                        action.icon
                                                    )
                                                " />
                                        </div>
                                    }
                                    <span>{{ action.label }}</span>
                                </button>
                            </div>
                        }
                    }
                    <div class="form-control mt-6">
                        <button
                            class="btn btn-outline"
                            type="button"
                            (click)="onCloseModal()">
                            <span close-icon className="mr-2 h-6 w-6"></span>
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </form>`,
})
export class AdminFormComponent<T extends Identifiable>
    implements OnInit, OnDestroy
{
    private transactionSubscription: Subscription | null = null
    @Input() modalConfig!: EntityFormModel<T>
    @Output() closeModal = new EventEmitter<void>()
    group!: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private iconService: IconService,
        private notification: NotificationService
    ) {}

    ngOnInit(): void {
        this.group = this.createFormGroup(
            this.modalConfig.fields,
            this.modalConfig.initialValue
        )
    }

    onCloseModal(): void {
        this.closeModal.emit()
    }

    createFormGroup(
        fields: FormField[],
        initialValue: Identifiable | undefined
    ): FormGroup {
        const group: { [key: string]: any } = {}
        fields.forEach(field => {
            if (field.type === EntityForm && field.fields) {
                group[field.id] = this.createFormGroup(
                    field.fields,
                    initialValue?.[field.id]
                )
            } else {
                group[field.id] = [
                    initialValue?.[field.id],
                    field.validators || [],
                ]
            }
        })
        return this.formBuilder.group(group)
    }

    getIconComponent(iconName: string): Type<unknown> | null {
        return this.iconService.getIconComponent(iconName)
    }

    /**
     * Returns the color class for the button.
     * @param color string
     * @returns string
     */
    getColorClass(color: string | undefined): string {
        return color ? `btn-${color}` : 'btn-primary'
    }

    onSubmit(callback?: () => void) {
        if (callback) {
            callback()
        }
        const form = { ...this.group.value }
        for (const key in form) {
            if (form[key] === null || form[key] === undefined) {
                delete form[key]
            }
        }

        const formValue = { ...form }
        this.modalConfig.fields.forEach(field => {
            if (field.type.name === 'dynamic-select') {
                formValue[field.id] = this.selectionToUris(
                    formValue[field.id],
                    field.id
                )
            }
        })

        if (
            this.modalConfig.actionType === 'edit' &&
            this.modalConfig.initialValue
        ) {
            // edit
            formValue.id = this.modalConfig.initialValue.id
            const transactionId = uuidv4()
            this.modalConfig.onEdit(formValue, transactionId)
            this.updateRelations(form)
            this.transactionSubscription = this.modalConfig
                .selectTransactionStatus(transactionId)
                .subscribe(status => {
                    if (status.status === 'success') {
                        this.onCloseModal()
                        if (this.modalConfig.onSuccess) {
                            this.modalConfig.onSuccess()
                        }
                        this.notification.success(
                            'Modifié avec succès',
                            `Le ${this.modalConfig.title} a été modifié avec succès`
                        )
                    } else if (status.status === 'failure') {
                        this.notification.error(
                            'Erreur',
                            `Une erreur est survenue lors de la modification du ${this.modalConfig.title}`
                        )
                    }
                })
        } else if (this.modalConfig.actionType === 'add') {
            const transactionId = uuidv4()
            this.modalConfig.onAdd(formValue, transactionId)
            this.transactionSubscription = this.modalConfig
                .selectTransactionStatus(transactionId)
                .subscribe(status => {
                    if (status.status === 'success') {
                        this.onCloseModal()
                        if (this.modalConfig.onSuccess !== undefined) {
                            this.modalConfig.onSuccess()
                        }
                        this.notification.success(
                            'Ajouté avec succès',
                            `Le ${this.modalConfig.title} a été ajouté avec succès`
                        )
                    } else if (status.status === 'failure') {
                        this.notification.error(
                            'Erreur',
                            `Une erreur est survenue lors de l'ajout du ${this.modalConfig.title}`
                        )
                    }
                })
        }
    }
    updateRelations(form: any) {
        // check if there is a dynamic select field and set the relations
        this.modalConfig.fields.forEach(field => {
            if (
                field.type.name === 'dynamic-select' &&
                field.dynamicOptions?.setRelations &&
                form[field.id] &&
                this.modalConfig.initialValue
            ) {
                form[field.id] = field.dynamicOptions.setRelations(
                    this.modalConfig.initialValue.id,
                    field.id,
                    this.selectionToIds(form[field.id])
                )
            }
        })
    }

    selectionToUris(selection: any[], relation: string): string[] {
        return selection.map(item => `/api/v1/auth/${relation}/${item.value}`)
    }
    selectionToIds(selection: any[]): number[] {
        return selection.map(item => item.value)
    }

    ngOnDestroy() {
        if (this.transactionSubscription) {
            this.transactionSubscription.unsubscribe()
        }
    }
}
