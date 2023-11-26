import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)
    console.log('adminGuard')
    if (authService.isLoggedIn() && authService.isAdmin()) {
        console.log('adminGuard true')
        return true
    }

    return router.parseUrl('/auth/login')
}
