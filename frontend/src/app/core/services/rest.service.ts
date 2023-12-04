import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseEntity } from '@core/entity/base.entity'
import { Page } from '@core/entity/page.entity'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export abstract class RestService<T extends BaseEntity> {
    url: string = environment.baseUrl

    constructor(public http: HttpClient) {}

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.url}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPage(params?: any): Observable<Page<T>> {
        return this.http.get<Page<T>>(this.url, { params })
    }

    getById(id: number[]): Observable<T[]> {
        return this.http.get<T[]>(`${this.url}/${id}`)
    }

    create(obj: T): Observable<T> {
        return this.http.post<T>(this.url, obj)
    }

    update(id: number, obj: T): Observable<T> {
        return this.http.put<T>(`${this.url}/${id}`, obj)
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.url}/${id}`)
    }

    deleteSelection(ids: number[]): Observable<T> {
        return this.http.delete<T>(`${this.url}/*${ids}`)
    }

    patch(id: number, obj: T): Observable<T> {
        return this.http.patch<T>(`${this.url}/${id}`, obj)
    }
}
