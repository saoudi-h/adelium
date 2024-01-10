import { CheckboxForm } from '@admin/forms/Forms'
import { Validators } from '@angular/forms'
import { HiddenInput } from '../Forms'
import { FormField } from '../forms.types'

export const mediaBooleanFormFields: FormField[] = [
    {
        id: 'content',
        type: CheckboxForm,
        label: 'Contenu',
        validators: [Validators.required],
    },
    {
        id: 'type',
        type: HiddenInput,
        default: 'boolean',
        label: 'Type',
        validators: [Validators.required],
    },
]
