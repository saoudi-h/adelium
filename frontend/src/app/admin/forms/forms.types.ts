import { TransactionStatus } from '@store/generic/generic.reducer'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidatorFn } from '@angular/forms'
import { Identifiable } from '@core/entity/identifiable.interface'
import { Observable } from 'rxjs'
import { DynamicOptions } from './forms.utility'

export type ActionType = 'add' | 'edit' | 'delete' | 'preview' | 'patch'

export interface EntityFormModel<T extends Identifiable> {
    title: string
    fields: FormField[]
    id?: number | string
    additionalInfo?: string
    initialValue?: T
    formValidators?: ValidatorFn[]
    actions?: FormAction[]
    actionType: ActionType
    onEdit: (form: T, transactionId: string) => void
    onAdd: (form: T, transactionId: string) => void
    onSuccess?: () => void
    selectTransactionStatus: (transactionId: string) => Observable<{
        status: TransactionStatus
    }>
}

export type FieldType = {
    name:
        | 'input'
        | 'select'
        | 'checkbox'
        | 'radio'
        | 'date'
        | 'datetime'
        | 'time'
        | 'file'
        | 'image'
        | 'color'
        | 'search'
        | 'range'
        | 'entity'
        | 'dynamic-select'
    option?: string
}

export interface ImageForm extends FieldType {
    name: 'image'
    option: 'url' | 'file' | 'url-file'
}

export interface SelectForm extends FieldType {
    name: 'select'
    option?: 'multiple' | 'single'
}

export interface InputForm extends FieldType {
    name: 'input'
    option:
        | 'text'
        | 'password'
        | 'email'
        | 'url'
        | 'textarea'
        | 'hidden'
        | 'number'
        | 'tel'
        | 'title'
}

export interface FormField {
    id: string
    type: FieldType
    label: string
    sortable?: boolean
    placeholder?: string
    helpText?: string
    validators?: ValidatorFn[]
    staticOptions?: Array<{ label: string; value: any; disabled?: boolean }>
    dynamicOptions?: DynamicOptions
    addTag?: boolean
    fields?: FormField[]
    inputFile?: {
        type: 'url' | 'file' | 'url-file'
        file?: File
    }
}

export interface FormAction {
    label: string
    action: () => void
    type?: 'submit' | 'button' | 'reset' | 'cancel' | 'delete' | 'preview'
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
    icon?: string
}
