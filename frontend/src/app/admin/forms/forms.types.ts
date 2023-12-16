/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidatorFn } from '@angular/forms'
import { Identifiable } from '@core/entity/identifiable.interface'
import { Observable } from 'rxjs'

export interface EntityFormModel<T extends Identifiable> {
    title: string
    fields: FormField[]
    id?: number | string
    actions?: FormAction[]
    additionalInfo?: string
    initialValue?: T
    formValidators?: ValidatorFn[]
    onFormSubmit: (formValue: any) => void
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
    option: 'url' | 'file'
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
}

export interface FormField {
    id: number | string
    type: FieldType
    label: string
    placeholder?: string
    helpText?: string
    validators?: ValidatorFn[]
    staticOptions?: Array<{ label: string; value: any; disabled?: boolean }>
    dynamicOptions?: () => Observable<
        Array<{ label: string; value: any; disabled?: boolean }>
    >
    addTag?: boolean
}

export interface FormAction {
    label: string
    action: () => void
    type?: 'submit' | 'button' | 'reset' | 'cancel' | 'delete' | 'preview'
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
    icon?: string
}
