import { FormType, ImageForm, InputForm, SelectForm } from './forms.types'

export const MultiSelectForm: SelectForm = {
    name: 'select',
    option: 'multiple',
}

export const SingleSelectForm: SelectForm = {
    name: 'select',
    option: 'single',
}

export const CheckboxForm: FormType = {
    name: 'checkbox',
}

export const RadioForm: FormType = {
    name: 'radio',
}

export const DateForm: FormType = {
    name: 'date',
}

export const DatetimeForm: FormType = {
    name: 'datetime',
}

export const TimeForm: FormType = {
    name: 'time',
}

export const FileForm: FormType = {
    name: 'file',
}

export const EntityForm: FormType = {
    name: 'entity',
}

export const DynamicSelectForm: FormType = {
    name: 'dynamic-select',
}

export const SearchForm: FormType = {
    name: 'search',
}

export const RangeForm: FormType = {
    name: 'range',
}

export const ColorForm: FormType = {
    name: 'color',
}
export const ImageFormFile: ImageForm = {
    name: 'image',
    option: 'file',
}

export const ImageFormUrl: ImageForm = {
    name: 'image',
    option: 'url',
}

export const TextInput: InputForm = {
    name: 'input',
    option: 'text',
}

export const PasswordInput: InputForm = {
    name: 'input',
    option: 'password',
}

export const EmailInput: InputForm = {
    name: 'input',
    option: 'email',
}

export const UrlInput: InputForm = {
    name: 'input',
    option: 'url',
}

export const TextAreaInput: InputForm = {
    name: 'input',
    option: 'textarea',
}

export const HiddenInput: InputForm = {
    name: 'input',
    option: 'hidden',
}
export const NumberInput: InputForm = {
    name: 'input',
    option: 'number',
}

export const TelInput: InputForm = {
    name: 'input',
    option: 'tel',
}
