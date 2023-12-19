/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { Page } from '@core/entity/page.entity'
import { Observable } from 'rxjs'
import { PaginationParams } from './generic.reducer'

@Injectable()
/**
 * Abstract class representing a generic service for CRUD operations on entities.
 * @template T - The type of the entity.
 */
export abstract class GenericService<T extends Identifiable> {
    protected abstract apiUrl: string

    constructor(protected http: HttpClient) {}

    /**
     * Retrieves an entity by its ID.
     * @param id - The ID of the entity.
     * @returns An observable that emits the entity.
     */
    getById(id: string | number): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${id}`)
    }

    /**
     * Creates a new entity.
     * @param item - The entity to be created.
     * @returns An observable that emits the created entity.
     */
    create(item: T): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}`, item)
    }

    /**
     * Updates an existing entity.
     * @param item - The entity to be updated.
     * @returns An observable that emits the updated entity.
     */
    update(item: T): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${item.id}`, item)
    }

    /**
     * Partially updates an existing entity.
     * @param item - The entity to be patched.
     * @returns An observable that emits the patched entity.
     */
    patch(item: T): Observable<T> {
        return this.http.patch<T>(`${this.apiUrl}/${item.id}`, item)
    }

    /**
     * Deletes an entity by its ID.
     * @param id - The ID of the entity to be deleted.
     * @returns An observable that emits the result of the deletion.
     */
    delete(id: string | number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    /**
     * Deletes multiple entities by their IDs.
     * @param ids - An array of IDs of the entities to be deleted.
     * @returns An observable that emits the result of the deletion.
     */
    deleteSelection(ids: (string | number)[]): Observable<any> {
        return this.http.request('delete', `${this.apiUrl}`, { body: ids })
    }

    /**
     * Retrieves a paginated list of entities.
     * @param params - The pagination parameters.
     * @returns An observable that emits the page of entities.
     */
    getPage(params: PaginationParams): Observable<Page<T>> {
        let queryParams = new HttpParams()
            .set('page', params.page.toString())
            .set('size', params.size.toString())

        params.sort.forEach(sortCriterion => {
            const sortParam = `${sortCriterion.property},${sortCriterion.direction}`
            queryParams = queryParams.append('sort', sortParam)
        })

        return this.http.get<Page<T>>(`${this.apiUrl}`, { params: queryParams })
    }

    /**
     * Retrieves a paginated list of related entities.
     * @param entityId - The ID of the entity.
     * @param relation - The relation name.
     * @returns An observable that emits the page of related entities.
     */
    getRelatedEntities(
        entityId: number,
        relation: string
    ): Observable<Page<Identifiable>> {
        return this.http.get<Page<Identifiable>>(
            `${this.apiUrl}/${entityId}/${relation}`
        )
    }
}
