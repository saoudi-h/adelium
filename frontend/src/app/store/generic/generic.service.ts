/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { Page } from '@core/entity/page.entity'
import { Observable } from 'rxjs'
import { PaginationParams } from './generic.reducer'

@Injectable()
export abstract class GenericService<T extends Identifiable> {
    protected abstract apiUrl: string

    constructor(protected http: HttpClient) {}

    getById(id: string | number): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${id}`)
    }

    create(item: T): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}`, item)
    }

    update(item: T): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${item.id}`, item)
    }

    patch(item: T): Observable<T> {
        return this.http.patch<T>(`${this.apiUrl}/${item.id}`, item)
    }

    delete(id: string | number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    deleteSelection(ids: (string | number)[]): Observable<any> {
        return this.http.request('delete', `${this.apiUrl}`, { body: ids })
    }

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
}
