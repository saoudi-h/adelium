import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Tag } from '@core/entity/evaluation/tag.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class TagService extends GenericService<Tag> {
    protected apiUrl = `${environment.baseUrl}${environment.tagUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
