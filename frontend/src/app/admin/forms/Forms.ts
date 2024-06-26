import { FieldType, ImageForm, InputForm, SelectForm } from './forms.types'

export const MultiSelectForm: SelectForm = {
    name: 'select',
    option: 'multiple',
}

export const SingleSelectForm: SelectForm = {
    name: 'select',
    option: 'single',
}

export const CheckboxForm: FieldType = {
    name: 'checkbox',
}

export const RadioForm: FieldType = {
    name: 'radio',
}

export const DateForm: FieldType = {
    name: 'date',
}

export const DatetimeForm: FieldType = {
    name: 'datetime',
}

export const TimeForm: FieldType = {
    name: 'time',
}

export const FileForm: FieldType = {
    name: 'file',
}

export const EntityForm: FieldType = {
    name: 'entity',
}

export const AddressEntityForm: FieldType = {
    name: 'entity',
    option: 'address',
}

export const MediaTextEntityForm: FieldType = {
    name: 'entity',
    option: 'media-text',
}

export const MediaBooleanEntityForm: FieldType = {
    name: 'entity',
    option: 'media-boolean',
}

export const DynamicSelectForm: FieldType = {
    name: 'dynamic-select',
    option: 'single',
}
export const MultiDynamicSelectForm: FieldType = {
    name: 'dynamic-select',
    option: 'multiple',
}

export const DynamicExternalSelectForm: FieldType = {
    name: 'dynamic-select',
    option: 'single-external',
}
export const MultiDynamicExternalSelectForm: FieldType = {
    name: 'dynamic-select',
    option: 'multiple-external',
}

export const SearchForm: FieldType = {
    name: 'search',
}

export const RangeForm: FieldType = {
    name: 'range',
}

export const ColorForm: FieldType = {
    name: 'color',
}
export const ImageFileForm: ImageForm = {
    name: 'image',
    option: 'file',
}

export const ImageUrlForm: ImageForm = {
    name: 'image',
    option: 'url',
}

export const ImageUrlFileForm: ImageForm = {
    name: 'image',
    option: 'url-file',
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
export const TitleInput: InputForm = {
    name: 'input',
    option: 'title',
}
