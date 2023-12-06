import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'

/**
 * Effects class for handling pagination related actions.
 */
@Injectable()
export class PaginationEffects {
    constructor(private actions$: Actions) {}
}
