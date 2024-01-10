import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MediaBoolean } from '@core/entity/evaluation/media-boolean.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class MediaBooleanService extends GenericService<MediaBoolean> {
    protected apiUrl = `${environment.baseUrl}${environment.mediaBooleanUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}