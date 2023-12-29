import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import * as AuthSelectors from '@store/auth/auth.selectors'
import { map, take } from 'rxjs'

export const notAuthGuard: CanActivateFn = () => {
    const store = inject(Store)
    const router = inject(Router)
    return store.select(AuthSelectors.selectIsLoggedIn).pipe(
        take(1),
        map(isLoggedIn => {
            if (!isLoggedIn) {
                return true
            }
            return router.parseUrl('/')
        })
    )
}
