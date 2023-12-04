import * as AuthSelectors from '@/store/auth/auth.selectors'
import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, take } from 'rxjs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const adminGuard: CanActivateFn = (route, state) => {
    const store = inject(Store)
    const router = inject(Router)
    return store.select(AuthSelectors.selectIsAdmin).pipe(
        take(1),
        map(isAdmin => {
            if (isAdmin) {
                return true
            }
            return router.parseUrl('/auth/login')
        })
    )
}
