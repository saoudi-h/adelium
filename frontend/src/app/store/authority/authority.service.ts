import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Authority } from '@core/entity/authority.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class AuthorityService extends GenericService<Authority> {
    protected apiUrl = `${environment.baseUrl}${environment.authorityEndPoint}`

    constructor(http: HttpClient) {
        super(http)
    }
}
