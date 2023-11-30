import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Base } from '@core/models/base.model'
import { Page } from '@core/models/page.model'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export abstract class RestService<T extends Base> {
    url: string = environment.baseUrl

    constructor(public http: HttpClient) {}

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.url}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPage(params?: any): Observable<Page<T>> {
        console.log('url : ', this.url)
        console.log('get page : ', params)
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
