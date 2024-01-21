import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Authority } from '@core/entity/auth/authority.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class AuthorityService extends GenericService<Authority> {
    protected apiUrl = `${environment.baseUrl}${environment.authorityEndPoint}`
    protected serviceUrl = `${environment.baseUrl}${environment.authServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
