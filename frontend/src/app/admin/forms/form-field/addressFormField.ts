import { Validators } from '@angular/forms'
import { NumberInput, TextInput } from '../Forms'
import { FormField } from '../forms.types'

export const addressFormFields: FormField[] = [
    {
        id: 'streetNumber',
        type: NumberInput,
        label: 'Numéro de rue',
        validators: [Validators.required, Validators.max(9999)],
    },
    {
        id: 'street',
        type: TextInput,
        label: 'Rue',
        validators: [Validators.required],
    },
    {
        id: 'additionalInfo',
        type: TextInput,
        label: "Complément d'addresse",
    },
    {
        id: 'city',
        type: TextInput,
        label: 'Ville',
        validators: [Validators.required],
    },
    {
        id: 'postalCode',
        type: NumberInput,
        label: 'Code postal',
        validators: [Validators.required],
    },
    {
        id: 'country',
        type: TextInput,
        label: 'Pays',
        validators: [Validators.required],
    },
    {
        id: 'departmentNumber',
        type: NumberInput,
        label: 'Numéro de département',
    },
]
