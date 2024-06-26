import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MediaText } from '@core/entity/evaluation/media-text.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class MediaTextService extends GenericService<MediaText> {
    protected apiUrl = `${environment.baseUrl}${environment.mediaTextUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
