/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidatorFn } from '@angular/forms'
import { Base } from '@core/models/base.model'
import { Observable } from 'rxjs'

/**
 * Role enum
 */
export enum Role {
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
}

/**
 * EntityAttribute interface
 *
 * @param key: string
 * @param name: string
 * @param type: string
 * @param required?: boolean
 * @param sortable?: false
 * @param display?: (row: any) => string
 * @param footer?: (data: any, key: string) => any
 * @param validators?: ValidatorFn[]
 * @param errorMessage?: string
 * @param options?: { [key: string]: any }
 * @param filteredOptions?: { [key: string]: any }
 */
export interface EntityAttribute {
    key: string
    name: string
    type: string
    required?: boolean
    sortable?: false
    display?: (row: any) => string
    footer?: (data: any, key: string) => any
    validators?: ValidatorFn[]
    errorMessage?: string
    options?: { [key: string]: any }
    filteredOptions?: { [key: string]: any }
}

/**
 * PageRequest interface
 *
 * @param search: string
 * @param page: number
 * @param size: number
 * @param sort?: string
 */
export interface PageRequest {
    search: string
    page: number
    size: number
    sort?: string
}

/**
 * TableData interface
 *
 * @param request: PageRequest
 * @param select?: number
 */
export interface TableData {
    request: PageRequest
    select?: number
}

/**
 * TableSelect interface
 *
 * @param observable: Observable<any[]>
 * @param options?: any[]
 * @param filteredOptions?: any[]
 * @param display: (value: any) => string
 */
export interface TableSelect {
    observable: Observable<any[]>
    options?: any[]
    filteredOptions?: any[]
    display: (value: any) => string
}

/**
 * DialogData interface
 *
 * @param name: string
 * @param attributes: EntityAttribute[]
 * @param value?: T
 */
export interface DialogData<T extends Base> {
    name: string
    attributes: EntityAttribute[]
    value?: T
}
