import { Identifiable } from '@core/entity/identifiable.interface'
import { createEntityAdapter } from '@ngrx/entity'

/**
 * Creates a generic entity adapter for an entity.
 * @returns An entity adapter for the entity.
 */
export function createGenericAdapter<T extends Identifiable>() {
    return createEntityAdapter<T>({
        selectId: (entity: T) => entity['id'],
    })
}
