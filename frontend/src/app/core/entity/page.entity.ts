import { Identifiable } from './identifiable.interface'

/**
 * Page model
 * @param T extends Base
 * @returns Page<T>
 * @example
 * ```ts
 * import { Page } from '@core/models/page.model'
 * import { Base } from '@core/models/base.model'
 *
 * export interface User extends Base {
 *    firstname: string
 *   lastname: string
 *  username: string
 * }
 *
 * export interface PageUser extends Page<User> {}
 * ```
 *
 */
export interface Page<T extends Identifiable> {
    page: {
        size: number
        totalElements: number
        totalPages: number
        number: number
    }
    _embedded: {
        [key: string]: T[]
    }
    _links: {
        [key: string]: {
            href: string
        }
    }
}
