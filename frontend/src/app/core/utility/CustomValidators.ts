import { AbstractControl, ValidatorFn } from '@angular/forms'

export class CustomValidators {
    static password(): ValidatorFn {
        return (control: AbstractControl) => {
            const password = control.value
            const hasNumber = /\d/.test(password)
            const hasUpper = /[A-Z]/.test(password)
            const hasLower = /[a-z]/.test(password)
            const hasSpecial = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)

            const isValid = hasNumber && hasUpper && hasLower && hasSpecial

            return isValid ? null : { password: true }
        }
    }

    static passwordMatch(
        password: () => AbstractControl<any, any> | null
    ): ValidatorFn {
        return (control: AbstractControl) => {
            const passwordControl = password()
            if (!passwordControl) return null
            const passwordValue = passwordControl.value
            const repeatPassword = control.value
            return passwordValue === repeatPassword
                ? null
                : { passwordMatch: true }
        }
    }
}
