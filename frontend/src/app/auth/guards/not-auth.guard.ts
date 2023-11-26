import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notAuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (!authService.isLoggedIn()) {
        return true
    }

    return router.parseUrl('/')
}
