import { Validators } from '@angular/forms'
import { HiddenInput, TextInput } from '../Forms'
import { FormField } from '../forms.types'

export const mediaTextFormFields: FormField[] = [
    {
        id: 'content',
        type: TextInput,
        label: 'Contenu',
        validators: [Validators.required],
    },
    {
        id: 'type',
        type: HiddenInput,
        default: 'text',
        label: 'Type',
        validators: [Validators.required],
    },
]
