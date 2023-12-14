/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidatorFn } from '@angular/forms'
import { Identifiable } from '@core/entity/identifiable.interface'
import { Observable } from 'rxjs'

export interface EntityFormModel<T extends Identifiable> {
    title: string
    fields: FormFieldConfig[]
    id?: number | string
    actions?: FormAction[]
    additionalInfo?: string
    initialValue?: T
    formValidators?: ValidatorFn[]
    onFormSubmit: (formValue: any) => void
}

export type FormType = {
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

export interface ImageForm extends FormType {
    name: 'image'
    option: 'url' | 'file'
}

export interface InputForm extends FormType {
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

export interface FormFieldConfig {
    id: number | string
    type: FormType
    label: string
    placeholder?: string
    helpText?: string
    options?: Array<{ label: string; value: any }>
    validators?: ValidatorFn[]
    dynamicOptions$?: Observable<Array<{ label: string; value: any }>>
}

export interface FormAction {
    label: string
    action: () => void
    type?: 'submit' | 'button' | 'reset' | 'cancel' | 'delete' | 'preview'
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
    icon?: string
}
