/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidatorFn } from '@angular/forms'
import { Identifiable } from '@core/entity/identifiable.interface'
import { TransactionStatus } from '@store/entities/generic/generic.reducer'
import { Observable } from 'rxjs'
import { DynamicOptions } from './forms.utility'

/**
 * Represents the type of action that can be performed on an entity form.
 */
export type ActionType = 'add' | 'edit' | 'delete' | 'preview' | 'patch'

/**
 * Represents the model for an entity form.
 * @template T - The type of the entity.
 * @property title - The title of the form.
 * @property fields - The fields of the form.
 * @property id - The id of the form.
 * @property additionalInfo - The additional info of the form.
 * @property initialValue - The initial value of the form.
 * @property formValidators - The validators of the form.
 * @property actions - The actions of the form.
 * @property actionType - The type of action of the form.
 * @property onEdit - The function to call when editing an entity.
 * @property onAdd - The function to call when adding an entity.
 * @property onSuccess - The function to call when the form is successfully submitted.
 * @property selectTransactionStatus - The function to call to select the transaction status.
 */
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

/**
 * Represents the type of a form field.
 */
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

/**
 * Represents a form field of type 'image'.
 */
export interface ImageForm extends FieldType {
    name: 'image'
    option: 'url' | 'file' | 'url-file'
}

/**
 * Represents a form field of type 'select'.
 */
export interface SelectForm extends FieldType {
    name: 'select'
    option?: 'multiple' | 'single'
}

/**
 * Represents a form field of type 'input'.
 */
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

/**
 * Represents a form field.
 * @property id - The identifier of the form field.
 * @property type - The type of the form field based on the FieldType interface.
 * @property label - The label of the form field.
 * @property hide - Whether to hide the form field on the display mode.
 * @property entity - when the form field is of type 'entity', the entity property is the name of the entity on the store.
 * @property default - The default value of the form field.
 * @property sortable - Whether the form field is sortable.
 * @property placeholder - The placeholder of the form field.
 * @property helpText - The help text of the form field.
 * @property validators - The validators of the form field.
 * @property staticOptions - The static options of the form field.
 * @property dynamicOptions - The dynamic options of the form field.
 * @property addTag - Whether to add a tag.
 * @property fields - The fields of the form field.
 * @property inputFile - The input file of the form field.
 */
export interface FormField {
    id: string
    type: FieldType
    label: string
    hide?: boolean
    entity?: string
    default?: any
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

/**
 * Represents an action that can be performed on a form.
 */
export interface FormAction {
    label: string
    action: () => void
    type?: 'submit' | 'button' | 'reset' | 'cancel' | 'delete' | 'preview'
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
    icon?: string
}
