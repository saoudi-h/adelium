import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '@core/services/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.isLoggedIn()) {
        return true
    }

    return router.parseUrl('/auth/login')
}