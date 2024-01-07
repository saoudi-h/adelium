import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MediaText } from '@core/entity/evaluation/media-text.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class MediaTextService extends GenericService<MediaText> {
    protected apiUrl = `${environment.baseUrl}${environment.mediaTextUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
