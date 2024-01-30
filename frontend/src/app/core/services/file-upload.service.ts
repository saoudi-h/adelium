/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    private url = `${environment.baseUrl}${environment.mediaServiceUrl}`

    constructor(private http: HttpClient) {}

    uploadFile(file: File): Observable<string> {
        const formData: FormData = new FormData()
        formData.append('file', file, file.name)

        const uploadUrl = `${this.url}/files/upload/true`

        return new Observable(observer => {
            this.http
                .post<{ url: string }>(uploadUrl, formData, {
                    reportProgress: true,
                    observe: 'events',
                })
                .subscribe({
                    next: (event: HttpEvent<any>) => {
                        if (event.type === HttpEventType.Response) {
                            if (event?.body.url) {
                                observer.next(event.body.url)
                                observer.complete()
                            } else {
                                observer.error(
                                    'URL non retournée par le serveur'
                                )
                            }
                        }
                    },
                    error: error => {
                        observer.error(error)
                    },
                })
        })
    }
}
