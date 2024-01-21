import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Tag } from '@core/entity/evaluation/tag.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class TagService extends GenericService<Tag> {
    protected apiUrl = `${environment.baseUrl}${environment.tagUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
