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

    static passwordMatch(passwordName: string): ValidatorFn {
        return (control: AbstractControl) => {
            const password = control.get(passwordName)?.value
            const repeatPassword = control.value
            return password === repeatPassword ? null : { passwordMatch: true }
        }
    }
}
